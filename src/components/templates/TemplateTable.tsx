import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
  
  interface TemplateTableProps {
    data: Array<any>;
    columns: Array<ColumnDef<any>>;
  }
  
  export function TemplateTable({ data, columns }: TemplateTableProps) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    const getWidth = (id: string | undefined) => {
        const widthObj = columns.find((col) => col.id === id);
        return widthObj ? (widthObj as any)?.width || widthObj.size || "100px" : "100px";
    };

    return (
      <div className="overflow-auto h-[calc(100vh-140px)] border bg-white w-1/2">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 text-left"
                  style={{
                    minWidth: getWidth(header.id),
                    width: getWidth(header.id),
                  }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t text-sm">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-1 px-2 text-left"  
                  style={{
                    minWidth: getWidth(cell.column.columnDef.id),
                    width: getWidth(cell.column.columnDef.id),
                  }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  