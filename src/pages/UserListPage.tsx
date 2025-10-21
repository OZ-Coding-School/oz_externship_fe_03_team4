import { useState } from "react";
import { Table } from "../components/Data-Indicate/Table";
import { Badge } from "../components/Badge";
import { useUsers } from "../hooks/useUsers";
import type { MappedUser } from "../types/user";

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

        {/* 검색 / 필터 */}
        <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <input
            type="text"
            placeholder="이메일, 닉네임, 이름, ID 검색..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">전체</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="withdrawn">탈퇴요청</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">전체 권한</option>
            <option value="admin">관리자</option>
            <option value="staff">스태프</option>
            <option value="user">일반회원</option>
          </select>
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