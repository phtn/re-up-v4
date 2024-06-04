import { type Column } from "@tanstack/react-table";

import { Button } from "@@ui/button";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@@ui/dropdown-menu";
import { cn } from "@src/utils/cn";
import { BeachDrop, BeachDropItem } from "./styles";
import {
  ArrowDown01Icon,
  ArrowUp10Icon,
  EyeOffIcon,
  ListFilterIcon,
} from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          "font-sans text-sm font-semibold tracking-tight text-dyan",
          className,
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <div className={cn("items-start space-x-2 text-dyan", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="my-1.5 h-8 px-1 text-sm data-[state=open]:bg-cyan-700/10 data-[state=open]:text-dyan"
          >
            <span className="font-sans text-sm font-semibold tracking-tight text-dyan">
              {title}
            </span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown01Icon className="ml-2 size-4 text-emerald-500" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp10Icon className="ml-2 size-4 text-indigo-500" />
            ) : (
              <ListFilterIcon className="ml-2 size-4 text-sky-500" />
            )}{" "}
          </Button>
        </DropdownMenuTrigger>
        <BeachDrop align={"start"}>
          <BeachDropItem
            selected={column.getIsSorted() === "asc"}
            onClick={() => column.toggleSorting(false)}
            className={column.getIsSorted() === "asc" ? `bg-cyan-700/10` : ``}
          >
            <ArrowUp10Icon className="mr-2 h-3.5 w-3.5 text-dyan" />
            Asc
          </BeachDropItem>
          <BeachDropItem
            selected={column.getIsSorted() === "desc"}
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDown01Icon className="mr-2 h-3.5 w-3.5 text-copper" />
            Desc
          </BeachDropItem>
          <DropdownMenuSeparator />
          <BeachDropItem
            selected={column.getIsVisible() === false}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-dyan" />
            Hide
          </BeachDropItem>
        </BeachDrop>
      </DropdownMenu>
    </div>
  );
}
