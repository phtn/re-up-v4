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
import { Button } from "@src/app/(ui)/button";
// import {
//   useCustomerController,
//   useFetchCustomer,
// } from "../../(hooks)/customer";

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

  // const { handleDeleteCustomer } = useCustomerController();
  // const { handleFindAllCustomers } = useFetchCustomer();

  // const handleDelete = (id: string) => async () => {
  //   await handleDeleteCustomer(id);
  //   return handleFindAllCustomers();
  // };

  return (
    <div>
      <div className="flex h-[56px] w-screen items-start space-x-4 overflow-x-scroll pt-1 md:w-full portrait:hidden">
        <DataTableToolbar table={table} />
      </div>
      <div className="h-[450px] overflow-scroll rounded-[4px] bg-white font-jet text-xs font-light text-clay">
        <Table>
          <TableHeader className="sticky font-medium tracking-tight">
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
                  className="font-light text-dyan hover:bg-sky-50/20"
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
                  className="h-24 py-4 text-center font-jet"
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
                  <div className="flex items-center justify-center space-x-4 text-xs">
                    <span>{loading}</span>
                    <MessageSquareTextIcon className="h-6 w-6 stroke-[1px] text-opus" />
                    <p>No records.</p>
                    <Button
                      variant={"ghost"}
                      size="sm"
                      className="text-xs text-indigo-500 hover:bg-indigo-600/10 hover:text-indigo-500"
                    >
                      Create an invoice
                    </Button>
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
