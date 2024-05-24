"use client";
import { UserRoundPlusIcon } from "lucide-react";
import { Header } from "../../(components)/header";
import { AddCustomer } from "./(form)/add-customer";

export const AddCustomerContent = () => {
  return (
    <div className="portrait:px-2">
      <div className="flex items-center space-x-3 portrait:space-x-1 portrait:px-1">
        <UserRoundPlusIcon className="size-5 stroke-1 text-copper/60" />
        <Header title="Add Customer" />
      </div>
      <div className="h-[600px] overflow-scroll pr-8 text-xs portrait:pr-0">
        <AddCustomer />
      </div>
    </div>
  );
};
