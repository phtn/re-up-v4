"use client";

import { Button } from "@src/app/(ui)/button";
import { Header } from "../(components)/header";
import { useFetchInvoices, useInvoiceController } from "../(hooks)/invoice";
import { cn } from "@src/utils/cn";
import { Disc3Icon, PlusIcon } from "lucide-react";
import { DataTable } from "./(invoices)/data-table";
import { columns } from "./(invoices)/column";

export const InvoicesContent = () => {
  const { handleCreateInvoiceRoute, invoiceLoading } = useInvoiceController();
  const { fetchingInvoices, invoiceList } = useFetchInvoices();
  return (
    <div className="pr-4">
      <div className="flex items-center space-x-4">
        <Header title="Invoices" />
        <Button
          size={"icon"}
          onClick={handleCreateInvoiceRoute}
          className={cn(
            `size-5 rounded-full bg-sky-500 p-0.5 text-white`,
            invoiceLoading ? `animate-spin` : ``,
          )}
        >
          {invoiceLoading ? <Disc3Icon /> : <PlusIcon />}
        </Button>
      </div>
      <div className="">
        <DataTable
          data={invoiceList?.data ?? []}
          loading={fetchingInvoices}
          columns={columns}
        />
      </div>
    </div>
  );
};
