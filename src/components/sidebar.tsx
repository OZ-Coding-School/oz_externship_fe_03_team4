import React from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  UserX,
  BookOpen,
  ClipboardList,
  Star,
  Megaphone,
  ChevronDown,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-4">
      {/* 상단 제목 */}
      <h2 className="text-gray-900 font-bold text-lg mb-6">관리자 패널</h2>

      {/* 메뉴 섹션 */}
      <nav className="flex flex-col gap-6 text-[15px] text-gray-700 font-medium">
        {/* 회원 관리 */}
        <div>
          <div className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-2">
            <span>회원 관리</span>
          </div>
          <ul className="flex flex-col gap-1">
            <SidebarLink to="/user-management" icon={<Users size={18} />} label="유저 관리" />
            <SidebarLink to="/withdraw-management" icon={<UserX size={18} />} label="탈퇴 관리" />
          </ul>
        </div>

        {/* 스터디 관리 */}
        <div>
          <div className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-2">
            <span>스터디 관리</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
          <ul className="flex flex-col gap-1">
            <SidebarLink to="/lecture-management" icon={<BookOpen size={18} />} label="강의 관리" />
            <SidebarLink to="/study-group-management" icon={<ClipboardList size={18} />} label="스터디 그룹 관리" />
            <SidebarLink to="/review-management" icon={<Star size={18} />} label="리뷰 관리" />
          </ul>
        </div>

        {/* 스터디 구인 공고 관리 */}
        <div>
          <div className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-2">
            <span>스터디 구인 공고 관리</span>
          </div>
          <ul className="flex flex-col gap-1">
            <SidebarLink to="/post-management" icon={<Megaphone size={18} />} label="공고 관리" />
            <SidebarLink to="/support-management" icon={<ClipboardList size={18} />} label="지원 내역 관리" />
          </ul>
        </div>
      </nav>
    </aside>
  );
};

// 🔗 NavLink 스타일 구성
interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink = ({ to, icon, label }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 ${
          isActive
            ? "bg-yellow-100 text-yellow-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <span className="text-gray-500">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;