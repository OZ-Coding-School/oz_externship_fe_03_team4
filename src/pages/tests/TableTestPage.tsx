import Table from "../../components/Data-Indicate/Table";
import Card from "../../components/Data-Indicate/Card";
import { User, Star } from "lucide-react"; // 아이콘 예시

export default function TableTestPage() {
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

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Table & Card 테스트 페이지</h1>

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
        <Table columns={columns} data={data} />
      </div>
    </section>
  );
}