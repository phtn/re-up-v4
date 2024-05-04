import * as React from "react";
import { type Column } from "@tanstack/react-table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@ui/command";
import { Popover, PopoverTrigger } from "@@ui/popover";
import { cn } from "@src/utils/cn";
import { DarkTouch } from "@src/app/(ui)/touch";
import { BotMessageSquareIcon, CheckIcon, CirclePlusIcon } from "lucide-react";
import { Checkbox } from "@src/app/(ui)/checkbox";
import { Beach, BeachItem, SpaceX } from "../styles";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <DarkTouch icon={CirclePlusIcon} size="sm" className="">
          {title}
        </DarkTouch>
      </PopoverTrigger>
      <Beach
        className={cn(
          "-mr-[3px] mt-[10.33px]",
          title === "status" ? "w-[200px]" : "w-[280px]",
        )}
        align="end"
      >
        <Command>
          <CommandInput placeholder={title} className="font-jet" />
          <CommandList>
            <CommandEmpty className="flex items-center space-x-2 border-t-[0.33px] border-ash p-3 font-jet text-xs text-opus">
              <BotMessageSquareIcon className="h-4 w-4" />
              <p>No results found.</p>
            </CommandEmpty>
            <CommandSeparator className="h-[0.33px] bg-opus" />
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <BeachItem
                    selected={isSelected}
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }

                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                      console.log(selectedValues);
                    }}
                  >
                    <Checkbox
                      className={cn(
                        `group mr-3`,
                        isSelected ? "border-void bg-void" : "",
                      )}
                    >
                      <CheckIcon
                        className={cn(
                          "h-4 w-4 scale-50 stroke-[0.33px] text-cord transition-all duration-300",
                          isSelected
                            ? `scale-100 stroke-[3px]`
                            : `scale-0 stroke-[1px]`,
                        )}
                      />
                    </Checkbox>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-clay" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </BeachItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator className="h-[1px] bg-ash/50" />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="group flex h-[36px] items-center justify-center rounded-none bg-void "
                  >
                    <p className="font-jet text-xs font-light uppercase text-kindle group-hover:text-orange-50">
                      Clear filters
                    </p>
                    <SpaceX />
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </Beach>
    </Popover>
  );
}
