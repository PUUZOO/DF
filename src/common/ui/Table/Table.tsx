import { ReactNode, useEffect, useState, useMemo, useCallback } from "react";
import arrow from "../../images/arrow.svg";
import styled from "styled-components";
import useSWR from "swr";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";

const emptyArray: [] = [];

type Props<P, T extends { data: any[]; count: number }> = {
  columns: (mutate: () => void) => ColumnDef<P, any>[];
  handler: string;
  title?: string;
  emptyComponent?: ReactNode;
  header?: (mutate: () => void) => JSX.Element;
  perPage?: string | number;
};

const Table = <P, T extends { data: any[]; count: number }>({
  columns,
  handler,
  title,
  emptyComponent,
  header,
  perPage = 5,
}: Props<P, T>) => {
  const [pageNum, setPageNum] = useState(0);
  const {
    data: tableData,
    error,
    isLoading,
    mutate: mutateTable,
  } = useSWR<T>(`${handler}?skip=${pageNum * +perPage}&limit=${perPage}`);

  const table = useReactTable({
    data: tableData?.data || emptyArray,
    columns: columns(mutateTable),
    getCoreRowModel: getCoreRowModel(),
    debugTable: process.env.NODE_ENV === "development",
  });

  return (
    <>
      <div
        className='d-flex justify-content-between align-content-center'
        style={{ marginBottom: "52px" }}
      >
        {title && (
          <h1>
            {title}
            {/* {entityName}
          <sup>{entities.length}</sup> */}
          </h1>
        )}
        <div>{header && header(mutateTable)}</div>
      </div>

      {!error ? (
        <>
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

          {/* Empty data */}
          {tableData?.count == 0 && <div className='mt-8'>{emptyComponent}</div>}

          {/* Paggination */}
          {tableData && tableData.data.length > 0 && (
            <div className='d-flex mt-10'>
              <PagginationBtn
                onClick={() => {
                  if (pageNum > 0) setPageNum(pageNum - 1);
                }}
                disabled={pageNum <= 0}
              >
                <img src={arrow.src} alt='' style={{ transform: "rotate(180deg)" }} />
              </PagginationBtn>

              {tableData.count > pageNum * +perPage + tableData.data.length && (
                <PagginationBtn
                  onClick={() => setPageNum(pageNum + 1)}
                  // disabled={!table.getCanNextPage()}
                >
                  <img src={arrow.src} alt='' />
                </PagginationBtn>
              )}
            </div>
          )}
        </>
      ) : (
        <>Произошла ошибка загрузки данных. Попробуйте попозже.</>
      )}
    </>
  );
};

const TableStyled = styled.table`
  width: 100%;
`;
const TableHeaderStyled = styled.thead`
  th {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #667482;
    height: 52px;
    border-bottom: 1px solid #d5d8db;
  }
`;

const TBodyStyled = styled.tbody`
  td {
    height: 56px;
    border-bottom: 1px solid #ebedef;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }
`;

const PagginationBtn = styled.div<{ disabled?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667482;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 6px;
  transition: 0.3s;
  :hover {
    background: ${({ disabled }) => (disabled ? "inherit" : "#f0f3f5")};
    color: #201d24;
    transition: 0.3s;
  }
`;

export default Table;
