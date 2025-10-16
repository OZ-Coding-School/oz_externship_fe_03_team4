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
} from "lucide-react";

//메뉴 데이터 타입 정의
interface MenuItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

//메뉴 리스트 컴포넌트 (각 섹션 안에서 사용)
const SidebarLinks = ({ items }: { items: MenuItem[] }) => {
  return (
    <ul className="flex flex-col gap-1">
      {items.map(({ to, icon, label }) => (
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
            <span className="text-gray-500">{icon}</span>
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  //각 섹션 열림 상태
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    user: true,
    study: true,
    post: true,
  });

  //섹션 토글 핸들러
  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  //메뉴 구성 데이터 (여기만 수정하면 메뉴 추가 가능)
  const menuSections: Record<string, MenuSection> = {
    user: {
      title: "회원 관리",
      items: [
        { to: "/user-management", icon: <Users size={18} />, label: "유저 관리" },
        { to: "/withdraw-management", icon: <UserX size={18} />, label: "탈퇴 관리" },
      ],
    },
    study: {
      title: "스터디 관리",
      items: [
        { to: "/lecture-management", icon: <BookOpen size={18} />, label: "강의 관리" },
        { to: "/study-group-management", icon: <ClipboardList size={18} />, label: "스터디 그룹 관리" },
        { to: "/review-management", icon: <Star size={18} />, label: "리뷰 관리" },
      ],
    },
    post: {
      title: "스터디 구인 공고 관리",
      items: [
        { to: "/post-management", icon: <Megaphone size={18} />, label: "공고 관리" },
        { to: "/support-management", icon: <ClipboardList size={18} />, label: "지원 내역 관리" },
      ],
    },
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-4">
      {/* 상단 제목 */}
      <h2 className="text-gray-900 font-bold text-lg mb-6">관리자 패널</h2>

      {/* 메뉴 섹션 */}
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
    </aside>
  );
};

export default Sidebar;