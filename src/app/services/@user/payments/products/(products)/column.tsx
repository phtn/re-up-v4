"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn } from "@src/utils/helpers";
import type { CopperxProductDataSchema } from "@src/server/resource/copperx/product";
import type {
  CurrencySchema,
  PaymentTypeSchema,
} from "@src/server/resource/copperx/common";
import { FileBoxIcon } from "lucide-react";
import Link from "next/link";
import { AmountCell } from "../../(components)/amount-cell";

export const columns: ColumnDef<CopperxProductDataSchema>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={""} className="w-[36px]" />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const baseRoute = "/services/payments/products";
      return (
        <Link href={`${baseRoute}/${id}`}>
          <div className="flex h-[40px] w-full items-center justify-center">
            <FileBoxIcon className="size-5 stroke-1 text-sky-600" />
          </div>
        </Link>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[100px]"
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      return (
        <p className="max-w-[20ch] font-sans text-sm font-medium tracking-tight">
          {row.getValue("name")}
        </p>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[150px]"
        column={column}
        title="Description"
      />
    ),
    cell: ({ row }) => {
      const desc: string = row.getValue("description");
      return (
        <div className="flex">
          <p className={"max-w-[20ch] text-xs"}>{desc}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "ref",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-[100px]" column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const id: string | undefined = row.getValue("id");
      const handleCopy = async () => {
        await copyFn({ specie: "product id", text: id });
      };
      return (
        <div
          onClick={handleCopy}
          className="group flex items-center text-sm text-dyan portrait:text-xs"
        >
          <span className="cursor-pointer decoration-dashed underline-offset-4 group-hover:underline">
            {id?.slice(-6)}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "paymentType",
    accessorKey: "defaultPrice.type",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[100px]"
        column={column}
        title="Type"
      />
    ),
    cell: (info) => {
      const paymentType = info.getValue() as PaymentTypeSchema;
      return <p className={"text-xs"}>{paymentType}</p>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "currency",
    accessorKey: "defaultPrice.currency",
    header: ({ column }) => (
      <DataTableColumnHeader className="" column={column} title="Currency" />
    ),
    cell: (info) => {
      const currency = info.getValue() as CurrencySchema;

      return (
        <div className={"flex w-[40px] justify-center"}>
          <p className={"font-sans text-xs font-medium uppercase"}>
            {currency === "tfi" ? "php" : currency}
          </p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "unitPrice",
    accessorKey: "defaultPrice.unitAmount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Unit Price"
        className="w-[200px] justify-end"
      />
    ),
    cell: ({ row }) => {
      const total: string | undefined = row.getValue("unitPrice");
      const currency: CurrencySchema | undefined = row.getValue("currency");

      return <AmountCell total={total} currency={currency} />;
    },
    enableSorting: false,
  },
];
