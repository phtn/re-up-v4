"use client";
import { Header } from "../../(components)/header";
import { AddCustomer } from "./(form)/add-customer";

export const AddCustomerContent = () => {
  return (
    <>
      <div className="flex items-center space-x-6">
        <Header title="Add Customer" />
        {/* <DarkTouch
          size="sm"
          className="h-fit"
          onClick={handleAddCustomer}
          tail={Disc3Icon}
          iconClass={cn(
            `stroke-[1.5px]`,
            loading ? `animate-spin size-4` : `size-0 hidden`,
          )}
        >
          Add
        </DarkTouch> */}
      </div>
      <div className="h-[600px] overflow-scroll pr-8 text-xs">
        <AddCustomer />
      </div>
    </>
  );
};
