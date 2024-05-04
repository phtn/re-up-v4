import { type AddProductSchema } from "@src/server/resource/copperx/product";
import { addProduct } from "@src/trpc/copperx/product";
import { onSuccess } from "@src/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const productRoute = `/services/payments/products`;

export const useAddProduct = () => {
  const [productLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddProductRoute = () => {
    setLoading(true);
    router.push(`${productRoute}/add-product`);
  };

  const handleAddProduct = async () => {
    setLoading(true);
    await addProduct(productResource).then((res) => {
      // const response: Record<string, unknown> = JSON.parse(
      //   res,
      // ) as ProductControllerCreateResponse200;
      // const data: ProductControllerCreateResponse200 =
      //   response.data as ProductControllerCreateResponse200;
      // console.log(data.name);
      console.log(res);
      setLoading(false);
      onSuccess("Product added successfully!", `Customer ID: ${0}`);
    });
  };

  return { handleAddProduct, handleAddProductRoute, productLoading };
};

export const productResource: AddProductSchema = {
  defaultPriceData: {
    currency: "usdc",
    type: "one_time",
    unitAmount: Number(parseInt("9223372036854775807")),
    interval: "day",
    intervalCount: 1,
  },
  name: "string",
  description: "string",
  isActive: true,
  unitLabel: "string",
  url: "https://github.com/phtn",
};
