"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn, prettyDate } from "@src/utils/helpers";
import type { CopperxInvoiceResponseDataSchema } from "@src/server/resource/copperx/invoice";
import Link from "next/link";
import { getValueAndCurrency } from "../../(context)/currency-list";
import Image from "next/image";
import { type CurrencySchema } from "@src/server/resource/copperx/common";
import { FileSymlinkIcon } from "lucide-react";

export const columns: ColumnDef<CopperxInvoiceResponseDataSchema>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="" className="w-[46px]" />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("id");

      return (
        <Link href={`/services/payments/invoices/${id}`}>
          <div className="flex w-full items-center justify-center">
            <FileSymlinkIcon className={"size-5 stroke-1 text-sky-600"} />
          </div>
        </Link>
      );
    },
    enableSorting: false,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created On"
        className="flex"
      />
    ),
    cell: ({ row }) => {
      const dateString: string | undefined = row.getValue("createdAt");

      const timestamp = prettyDate(dateString);
      const datetime = timestamp.split(" at ");

      return (
        <div className="flex flex-col items-start justify-center space-y-0.5 px-1">
          <p className="font-sans text-xs font-medium">{datetime[0]}</p>
          <p className="text-[11px] tracking-wide text-dyan/60">
            {datetime[1]}
          </p>
        </div>
      );
    },
  },
  {
    id: "total",
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="flex justify-end"
      />
    ),
    cell: ({ row }) => {
      const total: string | undefined = row.getValue("total");
      const currency: CurrencySchema | undefined = row.getValue("currency");
      const [totalAmount, symbol] = getValueAndCurrency(total, currency);

      return (
        <div className="flex items-center justify-end">
          {symbol ? (
            <Image
              alt="currency"
              src={symbol as string}
              width={0}
              height={0}
              className="h-[18px] w-auto px-1"
              quality={100}
            />
          ) : null}
          <p className="font-sans font-medium">{totalAmount}</p>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "currency",
    accessorKey: "currency",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Currency"
        className="flex"
      />
    ),
    cell: ({ row }) => {
      const currency: CurrencySchema | undefined = row.getValue("currency");

      return (
        <div className="flex items-center justify-center">
          <span className="text-[13px] uppercase tracking-tighter">
            {currency}
          </span>
        </div>
      );
    },
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "customer",
    accessorKey: "customer.name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[100px]"
        column={column}
        title="Customer"
      />
    ),
    cell: (info) => {
      const customer = info.getValue() as string;
      return (
        <div className="flex items-center pl-2">
          <p className={"font-sans text-sm font-medium tracking-tight"}>
            {customer}
          </p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "invoiceNumber",
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader
        className=""
        column={column}
        title="Customer number"
      />
    ),
    cell: (info) => {
      const invoiceNumber = info.getValue() as string;
      const handleCopy = async () => {
        await copyFn({ specie: "product id", text: invoiceNumber });
      };
      return (
        <div
          onClick={handleCopy}
          className="group flex items-center text-xs text-dyan"
        >
          <span className="cursor-pointer tracking-wide decoration-dashed underline-offset-4 group-hover:underline">
            {invoiceNumber}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "dueDate",
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader className="" column={column} title="Due" />
    ),
    cell: (info) => {
      const dateString = prettyDate(info.getValue() as string);
      const dueDate = dateString.split(" at ");

      return (
        <div className="flex w-full flex-col items-center justify-center px-2">
          <p className="text-xs">{dueDate[0]}</p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader className="" column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const id: string = row.getValue("id");

      return (
        <Link href={`/services/payments/invoices/${id}`} className="group">
          <div className="flex justify-start pl-8">
            <p className={"text-xs group-hover:text-sky-600"}>{status}</p>
          </div>
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
];
