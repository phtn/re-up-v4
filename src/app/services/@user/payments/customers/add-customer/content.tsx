"use client";
import { UserRoundPlusIcon } from "lucide-react";
import { Header } from "../../(components)/header";
import { AddCustomer } from "./(form)/add-customer";

export const AddCustomerContent = () => {
  return (
    <>
      <div className="flex items-center space-x-3">
        <UserRoundPlusIcon className="size-5 text-copper/60" />
        <Header title="Add Customer" />
      </div>
      <div className="h-[600px] overflow-scroll pr-8 text-xs">
        <AddCustomer />
      </div>
    </>
  );
};
