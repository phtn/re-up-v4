"use client";

import { Header } from "../(components)/header";
// import { Sorter } from "../(components)/sorter";
import { useCustomerController, useFetchCustomer } from "../(hooks)/customer";
import { Disc3Icon, PlusIcon } from "lucide-react";
import { cn } from "@src/utils/cn";
import { DataTable } from "./(cx-table)/data-table";
import { columns } from "./(cx-table)/column";
import { Button } from "@src/app/(ui)/button";

export const CustomersContent = () => {
  const { handleAddCustomerRoute, loading } = useCustomerController();
  const { cxFetchLoading, customerList } = useFetchCustomer();

  return (
    <div className="pr-4">
      <div className="flex items-center space-x-4">
        <Header title="Customers" />
        <Button
          size={"icon"}
          onClick={handleAddCustomerRoute}
          className={cn(
            `size-5 rounded-full bg-sky-500 p-0.5 text-white`,
            loading ? `animate-spin` : ``,
          )}
        >
          {loading ? <Disc3Icon /> : <PlusIcon />}
        </Button>
      </div>
      {/* <div className="grid grid-cols-1 bg-white md:grid-cols-4 md:gap-2">
        <Sorter title="Recent Paid" />
        <Sorter title="Delayed Payments" />
        <Sorter title="Action Required" />
        <Sorter title="Inactive" />
      </div> */}
      <div>
        <DataTable
          data={customerList?.data ?? []}
          loading={cxFetchLoading}
          columns={columns}
        />
      </div>
      <div className="flex h-[100] items-center">
        <Disc3Icon
          className={cxFetchLoading ? "size-4 animate-spin" : "hidden size-0"}
        />
      </div>
    </div>
  );
};
