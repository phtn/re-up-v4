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
          className="ml-auto hidden space-x-4 border-[0.33px] border-ash bg-paper/50 text-xs xl:flex"
        >
          <Settings2 className="size-4" />
          <p>View</p>
        </Button>
      </DropdownMenuTrigger>
      <BeachDrop align="end">
        <DropdownMenuLabel className="flex h-[45px] items-center space-x-2 px-2.5">
          <RepeatIcon className="size-3 -rotate-45 text-sky-400" />
          <p className="tracking-tighter text-sky-300">Toggle Columns</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0 h-[0.33px] bg-opus/20" />
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
                <span className="text-sky-50">{column.id}</span>
              </BeachCheckItem>
            );
          })}
      </BeachDrop>
    </DropdownMenu>
  );
}
