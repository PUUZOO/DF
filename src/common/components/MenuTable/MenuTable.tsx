import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import styled from "styled-components";

type Props<P> = {
  columns: ColumnDef<P, any>[];
  data: P[];
};

const MenuTable = <P,>({ columns, data }: Props<P>) => {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: process.env.NODE_ENV === "development",
  });

  return (
    <TableWrapper>
      <TableStyled>
        <TableHeaderStyled>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {/* {header.column.getCanFilter() ? (
                  <div>
                    <Filter column={header.column} table={table} />
                  </div>
                ) : null} */}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </TableHeaderStyled>

        <TBodyStyled>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </TBodyStyled>
      </TableStyled>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  height: 380px;
  overflow: auto;
  background: #f3f4f5;
  border-radius: 12px;
  padding: 20px;
`;

const TableStyled = styled.table`
  width: 100%;
`;
const TableHeaderStyled = styled.thead`
  th {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    height: 52px;
    color: #667482;
    border-bottom: 1px solid #d5d8db;
  }
`;

const TBodyStyled = styled.tbody`
  td {
    height: 56px;
    border-bottom: 1px solid #ebedef;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #201d24;
  }
`;

export default MenuTable;
