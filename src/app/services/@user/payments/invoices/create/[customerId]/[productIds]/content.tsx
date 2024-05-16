"use client";

import React, { useContext } from "react";
import { useCreateInvoice } from "../hooks";
import { CreateInvoiceForm } from "../../(form)/invoice-form";
import { PaymentsContext } from "../../../../(context)/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@src/lib/db";
import { usePathname } from "next/navigation";

export const CreatePageContent: React.FC = () => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const pathname = usePathname();
  const parentRoute = pathname.split("/")[3];

  const customers = useContext(PaymentsContext)?.customers;
  const products = useContext(PaymentsContext)?.products;

  const {
    addProduct,
    removeProduct,
    currentCustomerId,
    productIdList,
    updateCustomer,
  } = useCreateInvoice();

  const handleCustomerUpdate = (customerId: string | undefined) => () =>
    updateCustomer(customerId);

  const handleAddProduct = (productId: string) => () => addProduct(productId);
  const handleRemoveProduct = (productId: string) => () =>
    removeProduct(productId);

  return (
    <CreateInvoiceForm
      userId={userId}
      route={parentRoute}
      onSelect={handleCustomerUpdate}
      customerList={customers?.customerList}
      currentCustomerId={currentCustomerId}
      fetchingCustomers={customers?.fetchingCustomers}
      productList={products?.productList}
      fetchingProducts={products?.fetchingProducts}
      productIdList={productIdList}
      addProduct={handleAddProduct}
      removeProduct={handleRemoveProduct}
    />
  );
};
