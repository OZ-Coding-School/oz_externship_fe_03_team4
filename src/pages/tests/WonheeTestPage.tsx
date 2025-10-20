import { Table } from "../../components/Data-Indicate/Table";
import { Card } from "../../components/Data-Indicate/Card";
import { type NotificationItem, List } from "../../components/Data-Indicate/List";
import { User, Star } from "lucide-react";

export default function WonheeTestPage() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "이름" },
    { key: "email", label: "이메일" },
    {
      key: "status",
      label: "상태",
      render: (value: unknown) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "활성"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {String(value)}
        </span>
      ),
    },
  ];

  const data = [
    { id: 1, name: "김철수", email: "kim@example.com", status: "활성" },
    { id: 2, name: "이영희", email: "lee@example.com", status: "비활성" },
    { id: 3, name: "박민수", email: "park@example.com", status: "활성" },
  ];

  const cardData = [
    { title: "총 사용자", value: 1234, diff: "+12%", icon: User, color: "blue" },
    { title: "신규 등록", value: 56, diff: "+5%", icon: Star, color: "green" },
    { title: "비활성 계정", value: 12, diff: "-3%", icon: User, color: "purple" },
  ];

  // 명시적 타입 지정으로 List.tsx의 오류 해결
  const notifications: NotificationItem[] = [
    {
      id: 1,
      icon: "user",
      message: "새 사용자 등록",
      time: "2분 전",
      isRead: false,
    },
    {
      id: 2,
      icon: "order",
      message: "새 주문이 접수되었습니다",
      time: "5분 전",
      isRead: true,
    },
    {
      id: 3,
      icon: "system",
      message: "시스템 업데이트 완료",
      time: "1시간 전",
      isRead: true,
    },
  ];

  return (
    <section className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Table · Card · List 테스트 페이지</h1>

      {/* Card 섹션 */}
      <div className="flex gap-4 flex-wrap">
        {cardData.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            value={card.value}
            diff={card.diff}
            icon={card.icon}
            color={card.color as "blue" | "green" | "purple" | "gray" | "red"}
          />
        ))}
      </div>

      {/* Table 섹션 */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">사용자 목록</h2>
        <Table columns={columns} data={data} />
      </div>

      {/* List 섹션 */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">알림 리스트</h2>
        <List items={notifications} />
      </div>
    </section>
  );
}
