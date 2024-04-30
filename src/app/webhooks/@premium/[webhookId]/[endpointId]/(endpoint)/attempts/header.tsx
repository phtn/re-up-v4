import { type Column } from "@tanstack/react-table";

import { Button } from "@@ui/button";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@@ui/dropdown-menu";
import { cn } from "@src/utils/cn";
import { BeachDrop, BeachDropItem } from "../styles";
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
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="my-1.5 h-8 font-jet text-xs text-dyan data-[state=open]:bg-cyan-700/10 data-[state=open]:text-cyan-900"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown01Icon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp10Icon className="ml-2 h-4 w-4" />
            ) : (
              <ListFilterIcon className="ml-2 h-4 w-4" />
            )}{" "}
          </Button>
        </DropdownMenuTrigger>
        <BeachDrop align={title === "status" ? "start" : "end"}>
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
            <ArrowDown01Icon className="mr-2 h-3.5 w-3.5 text-dyan" />
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
