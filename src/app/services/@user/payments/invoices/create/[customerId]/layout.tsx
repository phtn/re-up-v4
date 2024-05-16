"use client";

import { FilePlusIcon } from "lucide-react";
import { Header } from "../../../(components)/header";
import { type ReactNode } from "react";

type CreateInvoiceLayoutProps = {
  children: ReactNode;
};

const CreateInvoiceLayout = ({ children }: CreateInvoiceLayoutProps) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <FilePlusIcon className="size-5 text-copper/60" />
        <Header title="Create Invoice" />
      </div>

      <div className="h-[540px] overflow-y-scroll pb-8 pr-8 text-xs">
        {children}
      </div>
    </>
  );
};
export default CreateInvoiceLayout;
