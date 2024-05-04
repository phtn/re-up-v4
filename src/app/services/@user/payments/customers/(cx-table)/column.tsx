"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn, prettyDate } from "@src/utils/helpers";
import { type CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import { Checkbox } from "@src/app/(ui)/checkbox";
import { cn } from "@src/utils/cn";
import { CheckIcon } from "lucide-react";

export const columns: ColumnDef<CopperxCustomerDataSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      >
        <CheckIcon
          className={cn(
            "h-4 w-4 scale-50 stroke-[0.33px] text-cord transition-all duration-300",
            row.getIsSelected()
              ? `scale-100 stroke-[3px]`
              : `scale-0 stroke-[1px]`,
          )}
        />
      </Checkbox>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[200px] text-copper"
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      return <p>{row.getValue("name")}</p>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[150px] text-sm text-copper"
        column={column}
        title="Email"
      />
    ),
    cell: ({ row }) => {
      return <p className={"text-xs"}>{row.getValue("email")}</p>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "organizationName",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[200px] text-xs text-copper"
        column={column}
        title="Organization"
      />
    ),
    cell: ({ row }) => {
      return <p className={"text-xs"}>{row.getValue("organizationName")}</p>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-[100px] text-sm text-copper"
        column={column}
        title="Customer Id"
      />
    ),
    cell: ({ row }) => {
      const id: string | undefined = row.getValue("id");
      const handleCopy = async () => {
        await copyFn({ specie: "customer id", text: id });
      };
      return (
        <div
          onClick={handleCopy}
          className="group flex items-center text-xs text-dyan"
        >
          <span className="cursor-pointer decoration-dashed underline-offset-4 group-hover:underline">
            {id?.slice(-12)}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),
    cell: ({ row }) => {
      const dateString: string | undefined = row.getValue("createdAt");

      const timestamp = prettyDate(dateString);

      return (
        <div className="flex w-[210px] items-center justify-center">
          <span className="text-xs">{timestamp}</span>
        </div>
      );
    },
  },
];
