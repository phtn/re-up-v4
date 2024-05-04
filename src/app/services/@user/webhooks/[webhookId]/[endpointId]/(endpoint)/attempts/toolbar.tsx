"use client";

import { type Table } from "@tanstack/react-table";

import { Button } from "@@ui/button";
import { Input } from "@@ui/input";

import { codes, statuses } from "./schema";
import { DataTableFacetedFilter } from "./filter";
import { DataTableViewOptions } from "./views";
import { SpaceX } from "../styles";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 pr-4 font-jet text-opus md:space-x-4 md:pr-0">
        <Input
          placeholder="filter eg. user.signup"
          value={(table.getColumn("msgId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("msgId")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] bg-void font-jet font-light text-cord focus:border-cord"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="status"
            options={statuses}
          />
        )}
        {table.getColumn("responseStatusCode") && (
          <DataTableFacetedFilter
            column={table.getColumn("responseStatusCode")}
            title="code"
            options={codes}
          />
        )}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="group flex h-[38px] items-center justify-center border border-opus px-2 text-kindle hover:border-kindle lg:px-3"
          >
            <p className="font-jet text-xs uppercase group-hover:text-orange-50">
              Reset
            </p>
            <SpaceX />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
