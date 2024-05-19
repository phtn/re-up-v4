import type {
  ProductControllerCreateResponse200,
  ProductControllerFindAllResponse200,
} from ".api/apis/copperx";
import type {
  CurrencySchema,
  PaymentTypeSchema,
} from "@src/server/resource/copperx/common";
import type {
  AddProductSchema,
  CopperxProductDataSchema,
  FindAllProductResponseSchema,
} from "@src/server/resource/copperx/product";
import { addProduct, findAllProducts } from "@src/trpc/copperx/product";
import { addProductInternal } from "@src/trpc/internal/payments/product";
import { errHandler, toggleState } from "@src/utils/helpers";
import { onSuccess } from "@src/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUnitAmount } from "./helpers";
import { type AddProductHookParams } from "./types";

const productRoute = `/services/payments/products`;

export const useProductController = () => {
  const [productLoading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [type, setPaymentType] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  const testAddProduct = (params: AddProductHookParams) => {
    const { data } = params;
    const product: AddProductSchema = {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      unitLabel: data.unitLabel,
      url: data.url,
      defaultPriceData: {
        currency: data.currency as CurrencySchema,
        type: data.type as PaymentTypeSchema,
        unitAmount: getUnitAmount(Number(data.unitAmount)), // "50_000_000_000"
      },
    };
    console.log(product);
  };

  const router = useRouter();
  const handleAddProductRoute = () => {
    setLoading(true);
    router.push(`${productRoute}/add-product`);
  };

  const handleProductStatus = () => toggleState(setIsActive);

  const handleAddProduct = async (params: AddProductHookParams) => {
    const { data, userId } = params;

    const productResource: AddProductSchema = {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      unitLabel: data.unitLabel,
      url: data.url,
      defaultPriceData: {
        currency: data.currency as CurrencySchema,
        type: data.type as PaymentTypeSchema,
        unitAmount: getUnitAmount(Number(data.unitAmount)), // "50_000_000_000"
        // unitAmount: '9_223_372_036_854_775_807',
      },
    };

    setLoading(true);
    addProduct(productResource)
      .then((res) => {
        const response: Record<string, unknown> = JSON.parse(
          res,
        ) as ProductControllerCreateResponse200;

        const result: CopperxProductDataSchema =
          response.data as CopperxProductDataSchema;
        console.log(result);

        addProductInternal({
          userId,
          id: result.id,
          responseData: result,
        })
          .then(() => {
            setLoading(false);
            onSuccess("Product added!", `Name: ${result.name}`);
          })
          //"Error", "Unabled to save product data."
          .catch((e: Error) =>
            errHandler(e, setLoading, "Error", "Unabled to save product data."),
          );
      })
      .catch((e: Error) => errHandler(e, setLoading));
  };

  return {
    handleAddProductRoute,
    handleProductStatus,
    handleAddProduct,
    productLoading,
    setPaymentType,
    testAddProduct,
    setCurrency,
    isActive,
    currency,
    type,
  };
};

export const useFetchProducts = () => {
  const [fetchingProducts, setLoading] = useState(false);
  const [productList, setProductList] = useState<
    FindAllProductResponseSchema | undefined
  >();

  const handleFindAllProducts = () => {
    setLoading(true);
    findAllProducts()
      .then((res) => {
        const response: Record<string, unknown> = JSON.parse(
          res,
        ) as ProductControllerFindAllResponse200;
        const result = response.data as FindAllProductResponseSchema;
        setProductList(result);
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    handleFindAllProducts();
  }, []);

  return {
    handleFindAllProducts,
    fetchingProducts,
    productList,
  };
};
