import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  Users,
  UserX,
  BookOpen,
  ClipboardList,
  Star,
  Megaphone,
  ChevronDown,
  ChartBar,
  LogOut,
} from "lucide-react";
import { logout } from "../lib/logout";

// 메뉴 데이터 타입 정의
interface MenuItem {
  to: string;
  icon: React.ElementType; // PR 반영
  label: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// 메뉴 리스트 컴포넌트 (각 섹션 안에서 사용)
const SidebarLinks = ({ items }: { items: MenuItem[] }) => {
  return (
    <ul className="flex flex-col gap-1">
      {items.map(({ to, icon: Icon, label }) => (
        <li key={to}>
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
            <span className="text-gray-500">
              <Icon size={18} /> {/* 렌더링 시 한 번만 size 지정 */}
            </span>
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    user: true,
    study: true,
    post: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 메뉴 구성 데이터 (아이콘 간략화)
  const menuSections: Record<string, MenuSection> = {
    user: {
      title: "회원 관리",
      items: [
        { to: "/userlist", icon: Users, label: "유저 관리" },
        { to: "/withdraw-management", icon: UserX, label: "탈퇴 관리" },
        { to: "/dashboard", icon: ChartBar, label: "대쉬 보드" },
      ],
    },
    study: {
      title: "스터디 관리",
      items: [
        { to: "/lecture-management", icon: BookOpen, label: "강의 관리" },
        { to: "/study-group-management", icon: ClipboardList, label: "스터디 그룹 관리" },
        { to: "/reviews", icon: Star, label: "리뷰 관리" },
      ],
    },
    post: {
      title: "스터디 구인 공고 관리",
      items: [
        { to: "/post-management", icon: Megaphone, label: "공고 관리" },
        { to: "/application", icon: ClipboardList, label: "지원 내역 관리" },
      ],
    },
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-4">
      <h2 className="text-gray-900 font-bold text-lg mb-6">관리자 패널</h2>

      <nav className="flex flex-col gap-6 text-[15px] text-gray-700 font-medium">
        {Object.entries(menuSections).map(([key, section]) => (
          <div key={key}>
            {/* 섹션 헤더 */}
            <div
              className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-2 cursor-pointer select-none"
              onClick={() => toggleSection(key)}
            >
              <span>{section.title}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  openSections[key] ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>

            {/* 섹션 내부 메뉴 */}
            {openSections[key] && <SidebarLinks items={section.items} />}
          </div>
        ))}
      </nav>
      <button
        onClick={logout}
        className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-red-600 hover:bg-red-100"
      >
        <LogOut size={18} />
        로그아웃
      </button>
    </aside>
  );
};

export default Sidebar;