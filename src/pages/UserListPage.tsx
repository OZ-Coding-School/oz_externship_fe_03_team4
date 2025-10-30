import { useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue" // hook 추가
import { Table } from "../components/Data-Indicate/Table";
import { Badge } from "../components/Badge";
import type { MappedUser } from "../types/user";
import { SearchInput } from "../components/search/SearchInput";
import { Select } from "../components/FormUI/Select";
import Modal from "../components/modal/Modal";
import { ModalHeader } from "../components/modal/ModalHeader";
import { UserModalOutlet } from "../components/User-Information/UserModalOutlet";
import { UserModalFooter } from "../components/User-Information/UserModalFooter";
import { useUsers } from "../hooks/useUsers";
import { Pagination } from "../components/pagination/Pagination";

const UserListPage = () => {
  // 검색 및 필터 상태
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search, 500); // 500ms 디바운스

  // React Query 훅으로 API 데이터 가져오기
  const { users, pagination, loading, error } = useUsers({
    page,
    limit: 20,
    search: debouncedSearch,
    status: statusFilter,
    role: roleFilter,
  });

  const totalPages = pagination?.total_pages ?? 1;

  // 모달 상태
  const [selectedUser, setSelectedUser] = useState<MappedUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 테이블 컬럼 정의
  const columns = [
    { key: "id", label: "회원 ID" },
    { key: "email", label: "이메일" },
    { key: "nickname", label: "닉네임" },
    { key: "name", label: "이름" },
    { key: "birthday", label: "생년월일" },
    {
      key: "role",
      label: "권한",
      render: (value: unknown) => {
        const role = value as "관리자" | "스태프" | "일반회원";
        let variant: "info" | "primary" | "default" = "default";
        if (role === "관리자") variant = "info";
        else if (role === "스태프") variant = "primary";
        return <Badge variant={variant} label={role} />;
      },
    },
    {
      key: "status",
      label: "상태",
      render: (value: unknown) => {
        const status = value as "활성" | "비활성" | "탈퇴요청";
        let variant: "success" | "warning" | "default" = "default";
        if (status === "활성") variant = "success";
        else if (status === "탈퇴요청") variant = "warning";
        return <Badge variant={variant} label={status} />;
      },
    },
    { key: "joinedAt", label: "가입일" },
    { key: "withdrawAt", label: "탈퇴요청일" },
  ];

  // 유저 클릭 시 모달 열기
  const handleRowClick = (user: MappedUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  // 권한 변경 핸들러
  const handleRoleChange = (role: "admin" | "staff" | "user") => {
    if (!selectedUser) return;
    const roleMap: Record<"admin" | "staff" | "user", "관리자" | "스태프" | "일반회원"> = {
      admin: "관리자",
      staff: "스태프",
      user: "일반회원",
    };
    setSelectedUser({ ...selectedUser, role: roleMap[role] });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">유저 관리</h1>

        {/* 검색 / 필터 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex-1 min-w-[200px] max-w-full">
            <SearchInput
              placeholder="이메일, 닉네임, 이름, ID 검색..."
              value={search}
              onChangeText={setSearch}
              clearable
              className="w-full"
            />
          </div>

          <div className="w-40">
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1); // 필터 변경 시 페이지 1로 초기화
              }}
            >
              <option value="">전체</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="withdrawn">탈퇴요청</option>
            </Select>
          </div>

          <div className="w-40">
            <Select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1); // 필터 변경 시 페이지 1로 초기화
              }}
            >
              <option value="">전체 권한</option>
              <option value="admin">관리자</option>
              <option value="staff">스태프</option>
              <option value="user">일반회원</option>
            </Select>
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <p className="p-6 text-center text-gray-500">회원 목록 불러오는 중...</p>
          ) : error ? (
            <p className="p-6 text-center text-red-500">회원 목록을 불러오지 못했습니다.</p>
          ) : (
            <Table<MappedUser> data={users} columns={columns} onRowClick={handleRowClick} />
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage} // 간단하게 수정
            showFirstLast
          />
        </div>

        {/* 모달 */}
        {selectedUser && (
          <Modal isOn={isModalOpen} onBackgroundClick={() => setIsModalOpen(false)}>
            <div className="p-6 w-[700px]">
              <ModalHeader title="회원 상세 정보" onClose={() => setIsModalOpen(false)} />
              <UserModalOutlet
                userId={selectedUser.id}
                isEditing={isEditing}
                onUserChange={setSelectedUser}
              />
              <UserModalFooter
                user={selectedUser}
                isEditing={isEditing}
                onEditToggle={() => setIsEditing(!isEditing)}
                onClose={() => setIsModalOpen(false)}
                onRoleChange={handleRoleChange}
                onDelete={() => setIsModalOpen(false)}
              />
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default UserListPage;