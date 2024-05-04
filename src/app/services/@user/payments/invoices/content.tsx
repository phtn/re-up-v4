"use client";

import { DarkTouch } from "@src/app/(ui)/touch";
import { Header } from "../(components)/header";
import { Sorter } from "../(components)/sorter";
import { Disc3Icon, PlusIcon } from "lucide-react";
import { useCreateInvoice, useFetchInvoices } from "../(hooks)/invoice";
import { cn } from "@src/utils/cn";

export const InvoicesContent = () => {
  const { handleCreateInvoiceRoute, invoiceLoading } = useCreateInvoice();
  const {} = useFetchInvoices();
  return (
    <div className="pr-4">
      <div className="flex items-center justify-between space-x-6">
        <Header title="Invoices" />
        <div className="flex space-x-4">
          <DarkTouch
            size={"sm"}
            onClick={handleCreateInvoiceRoute}
            icon={invoiceLoading ? Disc3Icon : PlusIcon}
            iconClass={cn(
              ``,
              invoiceLoading ? `animate-spin size-4` : `size-6 stroke-[4px]`,
            )}
          >
            Create Invoice
          </DarkTouch>
          <DarkTouch
            size={"sm"}
            onClick={handleCreateInvoiceRoute}
            icon={invoiceLoading ? Disc3Icon : PlusIcon}
            iconClass={cn(
              ``,
              invoiceLoading ? `animate-spin size-4` : `size-6 stroke-[4px]`,
            )}
          >
            Create Invoice
          </DarkTouch>
        </div>
      </div>
      <div className="grid h-[180px] grid-cols-1 bg-white md:grid-cols-5 md:gap-2">
        <Sorter title="Active" />
        <Sorter title="Draft" />
        <Sorter title="Overdue" />
        <Sorter title="Outstanding" />
        <Sorter title="Paid" />
      </div>
    </div>
  );
};
