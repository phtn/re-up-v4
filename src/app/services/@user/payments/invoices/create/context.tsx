"use client";

import { extractAndCheck } from "@src/utils/helpers";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState, type ReactNode } from "react";

export interface CreateInvoiceContextProps {
  currentCustomerId: string | undefined;
  productIdList: string[];
  updateCustomer: (id: string | undefined) => void;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

export const CreateInvoiceContext = createContext<
  CreateInvoiceContextProps | undefined
>(undefined);

interface CreateInvoiceProviderProps {
  children: ReactNode;
}

export const CreateInvoiceProvider: React.FC<CreateInvoiceProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [baseRoute, goodRoute] = extractAndCheck(pathname, 2, "create");
  const customerId = pathname?.split("/")[5];
  const productIds = pathname?.split("/")[6];

  const [currentCustomerId, setCurrentCustomerId] = useState<
    string | undefined
  >(customerId);
  const initialProductIdList = productIds ? productIds?.split(",") : [];
  const [productIdList, setProductIdList] =
    useState<string[]>(initialProductIdList);

  useEffect(() => {
    setCurrentCustomerId(customerId ?? "");
    setProductIdList(productIds ? productIds.split(",") : ["p"]);
  }, [customerId, productIds, baseRoute]);

  const updateCustomer = (id: string | undefined) => {
    setCurrentCustomerId(id);
    if (goodRoute) {
      router.push(`${baseRoute}/${id}/${productIdList.join(",")}`);
    }
  };

  const addProduct = (productId: string) => {
    const newProductIdList = [...productIdList, productId].filter(
      (element) => element !== "0",
    );
    setProductIdList(newProductIdList);
    router.push(
      `${baseRoute}/${currentCustomerId}/${newProductIdList.join(",")}`,
    );
  };

  const removeProduct = (productId: string) => {
    const newProductIdList = productIdList.filter((id) => id !== productId);
    setProductIdList(newProductIdList);
    router.push(
      `${baseRoute}/${currentCustomerId}/${newProductIdList.join(",")}`,
    );
  };

  return (
    <CreateInvoiceContext.Provider
      value={{
        addProduct,
        productIdList,
        removeProduct,
        updateCustomer,
        currentCustomerId,
      }}
    >
      {children}
    </CreateInvoiceContext.Provider>
  );
};
