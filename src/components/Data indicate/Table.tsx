import React from "react";

interface TableColumn {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  className?: string;
}

// 재사용 가능한 공통 Table 컴포넌트
function Table({ columns, data, className = "" }: TableProps) {
  return (
    <div className={`overflow-hidden rounded-lg border border-gray-200 ${className}`}>
      <table className="min-w-full border-collapse bg-white">
        {/* 헤더 */}
        <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left border-b border-gray-200"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* 본문 */}
        <tbody className="text-sm text-gray-700">
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-3 border-b border-gray-100">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
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
}

export default Table;