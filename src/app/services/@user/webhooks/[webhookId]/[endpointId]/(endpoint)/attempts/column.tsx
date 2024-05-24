"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { StatusBadge } from "@@ui/badge";
// import { Checkbox } from "@@ui/checkbox";
// := ->  file, err >- os.open("file")

import { statuses } from "./schema";
import { DataTableColumnHeader } from "./header";
import { type MessageAttemptOut } from "svix";
import { cn } from "@src/utils/cn";
import { copyFn, prettyDate } from "@src/utils/helpers";

export const columns: ColumnDef<MessageAttemptOut>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[100px] text-xs text-dyan"
        column={column}
        title="status"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => +status.value === row.getValue("status"),
      );

      return (
        <StatusBadge variant={statusVariant(row.getValue("status"))}>
          {status?.label}
        </StatusBadge>
      );
    },
    filterFn: (row, id, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(id)));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "responseStatusCode",
    id: "responseStatusCode",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-xs text-dyan"
        column={column}
        title="code"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <p
            className={cn(
              codeVariant(row.original.responseStatusCode),
              `font-medium`,
            )}
          >
            {row.getValue("responseStatusCode")}
          </p>
        </div>
      );
    },
    filterFn: (row, code, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(code)));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "msgId",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-[100px] justify-center text-xs text-dyan"
        column={column}
        title="message id"
      />
    ),
    cell: ({ row }) => {
      const id: string | undefined = row.getValue("msgId");
      const handleCopy = async () => {
        await copyFn({ specie: "message id", text: id });
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
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="timestamp" />
    ),
    cell: ({ row }) => {
      const dateString: string | undefined = row.getValue("timestamp");

      const timestamp = prettyDate(dateString);

      return (
        <div className="flex w-[210px] items-center justify-center">
          <span className="text-xs">{timestamp}</span>
        </div>
      );
    },
    // filterFn: (row, timestamp, value: string) => {
    //   return value.includes(row.getValue(responseStatusCode));
    // },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-[100px] justify-center text-xs text-dyan"
        column={column}
        title="attempt id"
      />
    ),
    cell: ({ row }) => {
      const id: string | undefined = row.getValue("id");
      return (
        <div className="flex w-[100px] items-center justify-center text-xs text-dyan">
          <span>{id?.slice(-6)}</span>
        </div>
      );
    },
    // filterFn: (row, id, value: string) => {
    //   return value.includes(row.getValue(id));
    // },
    enableSorting: false,
    enableHiding: true,
  },

  // {
  //   id: "id",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

const statusVariant = (status: number) => {
  switch (status) {
    case 0:
      return "succeeded";
    case 1:
      return "pending";
    case 2:
      return "failed";
    case 3:
      return "sending";
    default:
      return undefined;
  }
};

const codeVariant = (code: number) => {
  switch (code) {
    case 200:
      return "text-teal-700";
    case 308:
      return "text-amber-700";
    case 307:
      return "text-orange-700";
    default:
      return "text-rose-700";
  }
};
