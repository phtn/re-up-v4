"use client";

import { DarkTouch } from "@src/app/(ui)/touch";
import { Header } from "../../(components)/header";
import { productResource, useAddProduct } from "../../(hooks)/product";
import { cn } from "@src/utils/cn";
import { Disc3Icon } from "lucide-react";

export const AddProductContent = () => {
  const { handleAddProduct, productLoading } = useAddProduct();
  return (
    <>
      <div className="flex items-center space-x-6">
        <Header title="Add Product" />
        <DarkTouch
          onClick={handleAddProduct}
          tail={Disc3Icon}
          iconClass={cn(
            `stroke-[1.5px]`,
            productLoading ? `animate-spin size-4` : `size-0 hidden`,
          )}
        >
          Add
        </DarkTouch>
      </div>
      <div className="h-[540px] overflow-scroll rounded border p-8 text-xs">
        <pre>{JSON.stringify(productResource, null, 2)}</pre>
      </div>
    </>
  );
};
