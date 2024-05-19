"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn, prettyDate } from "@src/utils/helpers";
import { type CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import Link from "next/link";

export const columns: ColumnDef<CopperxCustomerDataSchema>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     >
  //       <CheckIcon
  //         className={cn(
  //           "h-4 w-4 scale-50 stroke-[0.33px] text-cord transition-all duration-300",
  //           row.getIsSelected()
  //             ? `scale-100 stroke-[3px]`
  //             : `scale-0 stroke-[1px]`,
  //         )}
  //       />
  //     </Checkbox>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
      return (
        <div className="flex flex-col items-start justify-center space-y-0.5">
          <p className="font-sans font-semibold uppercase tracking-tight">
            {row.getValue("name")}
          </p>
          <p className="text-[11px] capitalize">
            {row.getValue("organizationName")}
          </p>
        </div>
      );
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
    accessorKey: "customerNumber",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-[100px] text-sm text-copper"
        column={column}
        title="Id"
      />
    ),
    cell: ({ row }) => {
      const id: string | undefined = row.getValue("customerNumber");
      const handleCopy = async () => {
        await copyFn({ specie: "success", text: id, label: "customer id" });
      };
      return (
        <div
          onClick={handleCopy}
          className="group flex items-center text-xs text-dyan"
        >
          <span className="cursor-pointer decoration-dyan/60 decoration-dashed underline-offset-4 group-hover:underline">
            {id}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-[100px] justify-center text-sm text-copper"
        column={column}
        title="Actions"
      />
    ),
    cell: ({ row }) => {
      const id: string | undefined = row.getValue("customerNumber");

      return (
        <Link href={`/services/payments/customers/${id}`}>
          <div className="flex w-[100px] items-center justify-center text-xs font-semibold uppercase text-dyan hover:text-sky-600">
            view
          </div>
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created On"
        className="flex w-full justify-end"
      />
    ),
    cell: ({ row }) => {
      const dateString: string | undefined = row.getValue("createdAt");

      const timestamp = prettyDate(dateString);
      const datetime = timestamp.split(" at ");

      return (
        <div className="flex w-full flex-col items-end justify-center px-2">
          <p className="text-xs font-medium">{datetime[0]}</p>
          <p className="text-[11px] text-dyan/60">{datetime[1]}</p>
        </div>
      );
    },
    enableSorting: false,
  },
];
