"use client";

import { Button } from "@src/app/(ui)/button";
import { cn } from "@src/utils/cn";
import { Disc3Icon, PlusIcon } from "lucide-react";
import { Header } from "../(components)/header";
import { useCustomerController } from "../(hooks)/customer";
import { columns } from "./(customers)/column";
import { DataTable } from "./(customers)/data-table";
import { useContext } from "react";
import { PaymentsContext } from "../(context)/context";

export const CustomersContent = () => {
  const { handleAddCustomerRoute, customerLoading } = useCustomerController();
  const customers = useContext(PaymentsContext)?.customers;

  return (
    <div className="pr-4 portrait:pr-0">
      <div className="flex items-center space-x-4 portrait:px-2">
        <Header title="Customers" />
        <Button
          size={"icon"}
          onClick={handleAddCustomerRoute}
          className={cn(
            `size-5 rounded-full bg-sky-500 p-0.5 text-white`,
            customerLoading ? `animate-spin stroke-1` : ``,
          )}
        >
          {customerLoading ? <Disc3Icon /> : <PlusIcon />}
        </Button>
      </div>
      <div>
        <DataTable
          data={customers?.customerList ?? []}
          loading={customers?.fetchingCustomers ?? false}
          columns={columns}
        />
      </div>
    </div>
  );
};
