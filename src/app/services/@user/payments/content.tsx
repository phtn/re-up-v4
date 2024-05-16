"use client";

import { XCard } from "@src/app/(ui)/xcard";
import { useCustomerController } from "./(hooks)/customer";
import {
  PackagePlusIcon,
  FilePlus2Icon,
  UserRoundPlusIcon,
} from "lucide-react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { PaymentsActivityChart } from "./(components)/chart";
import { Header } from "./(components)/header";
import { useProductController } from "./(hooks)/product";
import { useInvoiceController } from "./(hooks)/invoice";

export const PaymentsContent = () => {
  const { handleAddCustomerRoute, customerLoading } = useCustomerController();
  const { handleAddProductRoute, productLoading } = useProductController();
  const { handleCreateInvoiceRoute, invoiceLoading } = useInvoiceController();

  return (
    <div className="h-full w-full pl-4 pr-8">
      <Header title="Today" />
      <div className="h-full w-full overflow-y-scroll bg-white">
        <div className="grid h-[180px] grid-cols-1 bg-white md:grid-cols-3 md:gap-8">
          <XCard
            title="Create Invoice"
            description="Create and Send invoices."
            onClick={handleCreateInvoiceRoute}
            icon={FilePlus2Icon}
            loading={invoiceLoading}
          />
          <XCard
            title="Add Customers"
            description="Add customers to your list."
            onClick={handleAddCustomerRoute}
            icon={UserRoundPlusIcon}
            loading={customerLoading}
          />

          <XCard
            title="Add Products"
            description="Add products to your inventory."
            onClick={handleAddProductRoute}
            loading={productLoading}
            icon={PackagePlusIcon}
          />
        </div>
        <div className="my-8 h-[180px]">
          <div className="relative block">
            <div className="font-semibold tracking-tighter text-copper/50">
              Gross Volume
            </div>
            <div className="text-2xl font-bold text-copper">$0</div>
          </div>
          <ParentSize className="relative -top-[42px] rounded-none">
            {(dimensions) => <PaymentsActivityChart {...dimensions} />}
          </ParentSize>
        </div>

        <Header title="Recent Payments" />
        <div className="h-[350px] bg-gray-100/40 bg-[url('/svg/atm.svg')] bg-center bg-no-repeat"></div>
      </div>
    </div>
  );
};
