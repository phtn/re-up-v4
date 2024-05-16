"use client";

import { PackagePlusIcon } from "lucide-react";
import { Header } from "../../(components)/header";
import { AddProduct } from "./(form)/add-product";

export const AddProductContent = () => {
  return (
    <>
      <div className="flex items-center space-x-3">
        <PackagePlusIcon className="size-5 text-copper/60" />
        <Header title="Add Product" />
      </div>
      <div className="h-[600px] overflow-scroll pr-8 text-xs">
        <AddProduct />
      </div>
    </>
  );
};
