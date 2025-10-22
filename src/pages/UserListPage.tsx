import { useState } from "react";
import { Table } from "../components/Data-Indicate/Table";
import { Badge } from "../components/Badge";
import type { MappedUser } from "../types/user";
import { SearchInput } from "../components/search/SearchInput";
import { Select } from "../components/FormUI/Select";
// import { useUsers } from "../hooks/useUsers"; // 🔹 나중에 API 연동 시 사용

const UserListPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // 🔹 API 훅 주석 처리
  // const { users, loading, error } = useUsers({
  //   search,
  //   status: statusFilter,
  //   role: roleFilter,
  // });

  // 더미데이터
  const dummyUsers: MappedUser[] = [
    {
      id: "U001",
      email: "admin@example.com",
      nickname: "관리자1",
      name: "홍길동",
      birthday: "1988-05-12",
      role: "관리자",
      status: "활성",
      joinedAt: "2023-01-10",
      withdrawAt: "-",
    },
    {
      id: "U002",
      email: "staff01@example.com",
      nickname: "스태프A",
      name: "이영희",
      birthday: "1990-07-02",
      role: "스태프",
      status: "활성",
      joinedAt: "2023-03-25",
      withdrawAt: "-",
    },
    {
      id: "U003",
      email: "user99@example.com",
      nickname: "초보유저",
      name: "박철수",
      birthday: "1995-11-08",
      role: "일반회원",
      status: "비활성",
      joinedAt: "2023-04-17",
      withdrawAt: "-",
    },
    {
      id: "U004",
      email: "byeuser@example.com",
      nickname: "탈퇴예정자",
      name: "김민수",
      birthday: "1992-09-21",
      role: "일반회원",
      status: "탈퇴요청",
      joinedAt: "2022-12-03",
      withdrawAt: "2024-09-01",
    },
  ];

  // 🔹 클라이언트 필터링
  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.email.includes(search) ||
      user.nickname.includes(search) ||
      user.name.includes(search) ||
      String(user.id).includes(search);

    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "active" && user.status === "활성") ||
      (statusFilter === "inactive" && user.status === "비활성") ||
      (statusFilter === "withdrawn" && user.status === "탈퇴요청");

    const matchesRole =
      roleFilter === "" ||
      (roleFilter === "admin" && user.role === "관리자") ||
      (roleFilter === "staff" && user.role === "스태프") ||
      (roleFilter === "user" && user.role === "일반회원");

    return matchesSearch && matchesStatus && matchesRole;
  });

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

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">유저 관리</h1>

        {/* 검색 / 필터 영역 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg border border-gray-200">
          {/* 검색창 */}
          <div className="flex-1 min-w-[200px] max-w-full">
            <SearchInput
              placeholder="이메일, 닉네임, 이름, ID 검색..."
              value={search}
              onChangeText={setSearch}
              clearable
              className="w-full"
            />
          </div>

          {/* 상태 필터 */}
          <div className="w-40">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">전체</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="withdrawn">탈퇴요청</option>
            </Select>
          </div>

          {/* 권한 필터 */}
          <div className="w-40">
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">전체 권한</option>
              <option value="admin">관리자</option>
              <option value="staff">스태프</option>
              <option value="user">일반회원</option>
            </Select>
          </div>
        </div>

        {/* 🔹 로딩 / 에러 메시지 영역 (API 사용 시 주석 해제) */}
        {/* {loading && <p>로딩중...</p>} */}
        {/* {error && <p className="text-red-500">{error}</p>} */}

        {/* 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<MappedUser> data={filteredUsers} columns={columns} />
        </div>
      </main>
    </div>
  );
};

export default UserListPage;