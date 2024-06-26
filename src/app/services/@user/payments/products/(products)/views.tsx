"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { type Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@@ui/dropdown-menu";
import { RepeatIcon, Settings2 } from "lucide-react";
import { BeachCheckItem, BeachDrop } from "./styles";
import { Button } from "@src/app/(ui)/button";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant={"ghost"}
          className="focus-visible:ring-ring ml-auto hidden space-x-4 border-[0.33px] border-ash bg-paper/50 text-xs ring-offset-ash transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-[0.5px] xl:flex"
        >
          <Settings2 className="size-4" />
          <p>View</p>
        </Button>
      </DropdownMenuTrigger>
      <BeachDrop align="end">
        <DropdownMenuLabel className="flex h-[45px] items-center space-x-2 bg-cyan-900/5 px-2.5">
          <RepeatIcon className="size-3 -rotate-45 text-cyan-900" />
          <p className="tracking-tighter">Toggle Columns</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0 h-[0.33px] bg-opus" />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <BeachCheckItem
                selected={!column.getIsVisible()}
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </BeachCheckItem>
            );
          })}
      </BeachDrop>
    </DropdownMenu>
  );
}
