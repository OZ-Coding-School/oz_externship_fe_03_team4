import type { LucideIcon } from "lucide-react";

interface TableColumn<T> {
  key: keyof T | string;
  label?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns?: TableColumn<T>[];
  className?: string;
  icon?: LucideIcon;
  onRowClick?: (row: T) => void; // 추가
}

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  className = "",
  icon: Icon,
  onRowClick, // 🔹 추가
}: TableProps<T>) => {
  const autoColumns: TableColumn<T>[] =
    columns && columns.length > 0
      ? columns
      : data.length > 0
      ? (Object.keys(data[0]) as (keyof T)[]).map((key) => ({
          key,
          label: key.toString().charAt(0).toUpperCase() + key.toString().slice(1),
        }))
      : [];

  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
      <table className="min-w-full border-collapse bg-white">
        <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
          <tr>
            {autoColumns.map((col) => (
              <th
                key={col.key.toString()}
                scope="col"
                className="px-6 py-3 text-left border-b border-gray-200"
              >
                {col.label || col.key.toString()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`hover:bg-gray-50 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() => onRowClick?.(row)} // 클릭 이벤트 호출
              >
                {autoColumns.map((col) => (
                  <td
                    key={col.key.toString()}
                    className={`px-6 py-3 border-b border-gray-100 ${
                      Icon ? "flex items-center gap-2" : ""
                    }`}
                  >
                    {Icon && <Icon size={16} className="text-gray-500" />}
                    {col.render ? col.render(row[col.key as keyof T], row) : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={autoColumns.length || 1}
                className="px-6 py-6 text-center text-gray-400"
              >
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};