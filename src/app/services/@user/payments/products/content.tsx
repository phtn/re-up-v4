"use client";

import { DataTable } from "./(products)/data-table";
import { columns } from "./(products)/column";
import { useContext } from "react";
import { PaymentsContext } from "../(context)/context";

export const ProductsContent = () => {
  const products = useContext(PaymentsContext)?.products;

  return (
    <div className="mr-4 portrait:m-0">
      <DataTable
        data={products?.productList ?? []}
        loading={products?.fetchingProducts ?? false}
        columns={columns}
      />
    </div>
  );
};
