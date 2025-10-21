import { useState } from "react";
import { Table } from "../components/Data-Indicate/Table";
import { BadgeCheck, UserX } from "lucide-react";

const UserListPage = () => {
  // 더미 데이터(나중에 API로 변경)
  const [users] = useState([
    {
      id: "U001",
      email: "admin@example.com",
      nickname: "admin",
      name: "관리자",
      birth: "1990-01-15",
      role: "관리자",
      status: "활성",
      joinedAt: "2023. 1. 15.",
      withdrawAt: "-",
    },
    {
      id: "U002",
      email: "staff@example.com",
      nickname: "staff01",
      name: "김직원",
      birth: "1992-03-20",
      role: "스태프",
      status: "활성",
      joinedAt: "2023. 2. 10.",
      withdrawAt: "-",
    },
    {
      id: "U003",
      email: "user1@example.com",
      nickname: "user001",
      name: "이일반",
      birth: "1995-07-08",
      role: "일반회원",
      status: "활성",
      joinedAt: "2023. 3. 5.",
      withdrawAt: "-",
    },
    {
      id: "U004",
      email: "user2@example.com",
      nickname: "user002",
      name: "박사용",
      birth: "1988-11-12",
      role: "일반회원",
      status: "비활성",
      joinedAt: "2023. 4. 18.",
      withdrawAt: "2024. 1. 16.",
    },
    {
      id: "U005",
      email: "user3@example.com",
      nickname: "user003",
      name: "정회원",
      birth: "1993-09-12",
      role: "일반회원",
      status: "활성",
      joinedAt: "2023. 5. 22.",
      withdrawAt: "-",
    },
    {
      id: "U006",
      email: "user4@example.com",
      nickname: "user004",
      name: "최유저",
      birth: "1991-05-30",
      role: "일반회원",
      status: "활성",
      joinedAt: "2023. 6. 11.",
      withdrawAt: "-",
    },
    {
      id: "U007",
      email: "user5@example.com",
      nickname: "user005",
      name: "한멤버",
      birth: "1994-12-03",
      role: "일반회원",
      status: "활성",
      joinedAt: "2023. 7. 8.",
      withdrawAt: "-",
    },
    {
      id: "U008",
      email: "user6@example.com",
      nickname: "user006",
      name: "송제정",
      birth: "1989-08-17",
      role: "일반회원",
      status: "탈퇴요청",
      joinedAt: "2023. 8. 12.",
      withdrawAt: "2024. 1. 20.",
    },
  ]);

  // 테이블 컬럼 정의
  const columns = [
    { key: "id", label: "회원 ID" },
    { key: "email", label: "이메일" },
    { key: "nickname", label: "닉네임" },
    { key: "name", label: "이름" },
    { key: "birth", label: "생년월일" },
    {
      key: "role",
      label: "권한",
      render: (value: unknown) => {
        const role = value as string;
        const color =
          role === "관리자"
            ? "bg-purple-100 text-purple-700"
            : role === "스태프"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700";
        return <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>{role}</span>;
      },
    },
    {
      key: "status",
      label: "상태",
      render: (value: unknown) => {
        const status = value as string;
        const color =
          status === "활성"
            ? "text-green-600"
            : status === "비활성"
            ? "text-gray-400"
            : "text-yellow-600";
        const Icon = status === "활성" ? BadgeCheck : UserX;
        return (
          <div className="flex items-center gap-1">
            <Icon size={14} className={color} />
            <span className={`text-sm ${color}`}>{status}</span>
          </div>
        );
      },
    },
    { key: "joinedAt", label: "가입일" },
    { key: "withdrawAt", label: "탈퇴요청일" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">유저 관리</h1>

        {/* 검색 / 필터 영역 */}
        <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <input
            type="text"
            placeholder="이메일, 닉네임, 이름, ID 검색..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>전체</option>
            <option>활성</option>
            <option>비활성</option>
            <option>탈퇴요청</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>전체 권한</option>
            <option>관리자</option>
            <option>스태프</option>
            <option>일반회원</option>
          </select>
        </div>

        {/* 유저 목록 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table data={users} columns={columns} />
        </div>
      </main>
    </div>
  );
};

export default UserListPage;