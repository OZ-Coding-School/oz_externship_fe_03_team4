import type { LucideIcon } from "lucide-react";

interface TableColumn {
  key: string;
  label?: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface TableProps {
  data: Record<string, unknown>[];
  columns?: TableColumn[];
  className?: string;
  icon?: LucideIcon;
}

export const Table = ({ data, columns, className = "", icon: Icon }: TableProps) => {
  const autoColumns: TableColumn[] =
    columns && columns.length > 0
      ? columns
      : data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        }))
      : [];

  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
      <table className="min-w-full border-collapse bg-white">
        <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
          <tr>
            {autoColumns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-6 py-3 text-left border-b border-gray-200"
              >
                {col.label || col.key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                {autoColumns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-3 border-b border-gray-100 ${
                      Icon ? "flex items-center gap-2" : ""
                    }`}
                  >
                    {Icon && <Icon size={16} className="text-gray-500" />}
                    {col.render ? col.render(row[col.key], row) : (row[col.key] as React.ReactNode)}
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