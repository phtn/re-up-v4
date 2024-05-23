"use client";

import { Button } from "@src/app/(ui)/button";
import { Header } from "../(components)/header";
import { useInvoiceController } from "../(hooks)/invoice";
import { cn } from "@src/utils/cn";
import { Disc3Icon, PlusIcon } from "lucide-react";
import { DataTable } from "./(invoices)/data-table";
import { columns } from "./(invoices)/column";
import { useContext } from "react";
import { PaymentsContext } from "../(context)/context";

export const InvoicesContent = () => {
  const invoices = useContext(PaymentsContext)?.invoices;
  const { handleCreateInvoiceRoute, invoiceLoading } = useInvoiceController();

  return (
    <div className="pr-4 portrait:w-full portrait:p-0">
      <div className="flex items-center space-x-4 portrait:px-4">
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
      <div>
        <DataTable
          data={invoices?.invoiceList ?? []}
          loading={invoices?.fetchingInvoices ?? true}
          columns={columns}
        />
      </div>
    </div>
  );
};
