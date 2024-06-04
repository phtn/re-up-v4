"use client";

import { type Table } from "@tanstack/react-table";

import { Button } from "@@ui/button";

import { DataTableViewOptions } from "./views";
import { SpaceX } from "./styles";
import { InputLight } from "@src/app/(ui)/input";
import {
  DataTableFacetedFilter,
  DataTableCurrencyFilter,
} from "../../(components)/filter-facets";
import { statuses } from "./schema";
import { currencyList } from "../../(context)/currency-list";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex w-full items-center justify-between pr-4">
      <div className="flex flex-1 items-center space-x-2 px-2 text-opus md:space-x-4 md:pr-0">
        <InputLight
          placeholder="filter customer"
          value={
            (table.getColumn("customer")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customer")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[200px] bg-ghost font-jet font-light"
        />
        {table.getColumn("currency") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("currency") && (
          <DataTableCurrencyFilter
            column={table.getColumn("currency")}
            title="Currency"
            options={currencyList}
          />
        )}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="group flex h-[40px] items-center justify-center rounded-[4px] border border-sky-400 px-2 text-sky-400 hover:border-sky-400 hover:bg-sky-400 lg:px-3"
          >
            <p className="font-jet text-xs uppercase group-hover:text-white">
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
