import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@@ui/button";
import { Select, SelectTrigger, SelectValue } from "@@ui/select";
import { BeachSelect, BeachSelectItem } from "./styles";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

const sizes = [10, 20, 30, 40, 50];

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex w-full items-center overflow-x-scroll border-t-[0.33px] py-6 text-xs md:pb-2 md:pt-3">
      {/* <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex w-full items-center justify-between space-x-4 lg:space-x-8">
        <div className="flex items-center space-x-2 md:space-x-8">
          <p className="font-sans text-xs font-light text-opus">
            Rows per page
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: string) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              className="h-8 w-[75px] border-ash/80 font-jet text-sky-400"
              caretStyle="text-clay"
            >
              <SelectValue
                className="font-jet"
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <BeachSelect side="top">
              {sizes.map((pageSize) => (
                <BeachSelectItem
                  selected={pageSize === table.getState().pagination.pageSize}
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </BeachSelectItem>
              ))}
            </BeachSelect>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center font-sans text-[11px] font-light text-opus">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2 px-4 md:space-x-4">
          <Button
            variant="default"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="size-4 stroke-2 text-sky-500" />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-4 stroke-2 text-sky-500" />
          </Button>
          <Button
            variant="default"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4 stroke-2 text-sky-500" />
          </Button>
          <Button
            variant="default"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="size-4 stroke-2 text-sky-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
