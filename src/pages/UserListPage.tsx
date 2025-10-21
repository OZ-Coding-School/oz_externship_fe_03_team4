import { useState } from "react";
import { Table } from "../components/Data-Indicate/Table";
import { Badge } from "../components/Badge";
import { useUsers } from "../hooks/useUsers";
import type { MappedUser } from "../types/user";
import { SearchInput } from "../components/search/SearchInput";
import { Select } from "../components/FormUI/Select";

const UserListPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const { users, loading, error } = useUsers({
    search,
    status: statusFilter,
    role: roleFilter,
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
          {/* 검색창: flex-grow + min-width */}
          <div className="flex-1 min-w-[200px] max-w-full">
            <SearchInput
              placeholder="이메일, 닉네임, 이름, ID 검색..."
              value={search}
              onChangeText={setSearch}
              clearable
              className="w-full"
            />
          </div>

          {/* 상태 필터 Select: 고정 너비 */}
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

          {/* 권한 필터 Select: 고정 너비 */}
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

        {/* 로딩 / 에러 */}
        {loading && <p>로딩중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table<MappedUser> data={users} columns={columns} />
        </div>
      </main>
    </div>
  );
};

export default UserListPage;