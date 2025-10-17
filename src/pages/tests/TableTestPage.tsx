import Table from "../../components/Data-Indicate/Table"

export default function TableTestPage() {
  // 더미 컬럼 정의
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

  // 더미 데이터
  const data = [
    { id: 1, name: "김철수", email: "kim@example.com", status: "활성" },
    { id: 2, name: "이영희", email: "lee@example.com", status: "비활성" },
    { id: 3, name: "박민수", email: "park@example.com", status: "활성" },
  ];

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Table 컴포넌트 테스트</h1>
      <Table columns={columns} data={data} />
    </section>
  );
}