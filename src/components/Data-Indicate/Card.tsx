import { User } from "lucide-react";

interface CardProps {
  title: string;
  value: string | number;
  diff: string;
  icon: typeof User; // 특정 Lucide 아이콘 타입
  color?: string;
}

export const Card = ({
  title,
  value,
  diff,
  icon: Icon,
  color = "gray",
}: CardProps) => {
  const colorMap: Record<string, string> = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    purple: "text-purple-500 bg-purple-50",
    gray: "text-gray-500 bg-gray-50",
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md w-[250px]">
      {/* 상단 타이틀 + 아이콘 */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${colorMap[color]}`}
        >
          <Icon className={`${colorMap[color].split(" ")[0]} h-5 w-5`} />
        </div>
      </div>

      {/* 중앙 데이터 */}
      <div
        className={`mt-3 text-2xl font-bold ${colorMap[color].split(" ")[0]}`}
      >
        {value}
      </div>

      {/* 하단 전월 대비 */}
      <div className="mt-1 text-sm text-gray-500">전월 대비 {diff}</div>
    </div>
  );
};