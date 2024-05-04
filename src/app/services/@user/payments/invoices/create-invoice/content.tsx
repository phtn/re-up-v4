"use client";

import { DarkTouch } from "@src/app/(ui)/touch";
import { Header } from "../../(components)/header";
import { Disc3Icon } from "lucide-react";
import { cn } from "@src/utils/cn";
import { invoiceResource, useCreateInvoice } from "../../(hooks)/invoice";

export const CreateInvoiceContent = () => {
  const { handleCreateInvoice, invoiceLoading } = useCreateInvoice();
  return (
    <>
      <div className="flex items-center space-x-6">
        <Header title="Create Invoice" />
        <DarkTouch
          onClick={handleCreateInvoice}
          tail={Disc3Icon}
          iconClass={cn(
            `stroke-[1.5px]`,
            invoiceLoading ? `animate-spin size-4` : `size-0 hidden`,
          )}
        >
          Create
        </DarkTouch>
      </div>
      <div className="h-[540px] overflow-scroll rounded border p-8 text-xs">
        <pre>{JSON.stringify(invoiceResource, null, 2)}</pre>
      </div>
    </>
  );
};
