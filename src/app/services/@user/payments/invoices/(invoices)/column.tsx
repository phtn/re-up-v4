"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn, prettyDate } from "@src/utils/helpers";
import type { CopperxInvoiceDataSchema } from "@src/server/resource/copperx/invoice";

export const columns: ColumnDef<CopperxInvoiceDataSchema>[] = [
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="flex w-full justify-start"
      />
    ),
    cell: ({ row }) => {
      const dateString: string | undefined = row.getValue("createdAt");

      const timestamp = prettyDate(dateString);
      const datetime = timestamp.split(" at ");

      return (
        <div className="flex w-[100px] flex-col items-start justify-center space-y-0.5 px-1">
          <p className="font-sans text-xs font-medium">{datetime[0]}</p>
          <p className="text-[11px] tracking-wide text-dyan/60">
            {datetime[1]}
          </p>
        </div>
      );
    },
  },

  {
    id: "amount",
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="flex justify-end"
      />
    ),
    cell: (info) => {
      const amount = info.getValue() as string;
      const total = (Number(BigInt(amount ?? 0)) / 100000000).toFixed(2);
      // const currency = row.getValue("currency") as CurrencySchema;
      // const total = row.getValue("total");

      return (
        <div className="flex items-center justify-end">
          <span className="font-sans text-[17px] font-medium">{total}</span>
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
        title=""
        className="flex h-[16px] w-[16px] justify-center rounded-full border border-indigo-400 bg-indigo-100 bg-[url('/svg/all_currency.svg')] bg-cover p-0.5 "
      />
    ),
    cell: (info) => {
      const currency = info.getValue() as string;

      return (
        <div className="flex w-[40px] items-center justify-start">
          <span className="text-[13px] uppercase tracking-tighter">
            {currency}
          </span>
        </div>
      );
    },

    enableSorting: false,
  },
  {
    id: "invoiceNumber",
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-full text-sm text-copper"
        column={column}
        title="Invoice number"
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
    id: "customer",
    accessorKey: "customer.name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[100px] text-xs text-copper"
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
    id: "dueDate",
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-center text-xs text-copper"
        column={column}
        title="Due"
      />
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
      <DataTableColumnHeader
        className="flex w-full justify-center text-sm text-copper"
        column={column}
        title="Status"
      />
    ),
    cell: (info) => {
      const status = info.getValue() as string;

      return (
        <div className="flex justify-start pl-8">
          <p className={"text-xs"}>{status}</p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
];