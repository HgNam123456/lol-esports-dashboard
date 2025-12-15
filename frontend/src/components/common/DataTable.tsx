// placeholder
// frontend/src/components/common/DataTable.tsx
import React from "react"
interface Column<T = any> {
  key: keyof T | string;
  label: string;
}

interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No data
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((c) => (
                  <td key={String(c.key)}>
                    {(row as any)[c.key as string]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
