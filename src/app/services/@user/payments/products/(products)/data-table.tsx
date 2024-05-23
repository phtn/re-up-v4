import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@@ui/table";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";
import { CogIcon, MessageSquareTextIcon } from "lucide-react";
import { useProductController } from "../../(hooks)/product";
import { FormHeader } from "../../(components)/header";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const { handleAddProductRoute, productLoading } = useProductController();

  // const { handleDeleteCustomer } = useCustomerController();
  // const { handleFindAllCustomers } = useFetchCustomer();

  // const handleDelete = (id: string) => async () => {
  //   await handleDeleteCustomer(id);
  //   return handleFindAllCustomers();
  // };

  return (
    <div>
      <div className="flex h-[64px] w-screen items-center space-x-4 overflow-x-scroll border-0 py-1 md:w-full portrait:px-4">
        <FormHeader
          title="Products"
          onClick={handleAddProductRoute}
          loading={productLoading}
        />
        <DataTableToolbar table={table} />
      </div>
      <div className="h-[520px] overflow-scroll rounded-[4px] border-[0.33px] border-dyan/40 bg-white font-jet text-xs font-light portrait:rounded-none">
        <Table>
          <TableHeader className="sticky bg-paper tracking-tight portrait:rounded-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b-[0.33px] border-sky-400/50"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  // onClick={handleDelete(row.getValue("id"))}
                  className="h-[56px] font-light text-dyan hover:bg-sky-50"
                  key={row.getValue("id")}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center font-jet"
                >
                  <div className="flex items-center justify-center space-x-4 portrait:justify-start portrait:px-4">
                    <span className="animate-pulse font-semibold text-cyan-700">
                      Updating table
                    </span>
                    <CogIcon className="h-6 w-6 animate-spin stroke-[1px] text-cyan-800" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center font-jet"
                >
                  <div className="flex items-center justify-center space-x-4">
                    <span>{loading}</span>
                    <MessageSquareTextIcon className="h-6 w-6 stroke-[1px] text-opus" />
                    <span>No data.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
