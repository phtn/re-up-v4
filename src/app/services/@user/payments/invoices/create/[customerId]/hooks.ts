import { useContext } from "react";
import {
  CreateInvoiceContext,
  type CreateInvoiceContextProps,
} from "../context";

export const useCreateInvoice = (): CreateInvoiceContextProps => {
  const context = useContext(CreateInvoiceContext);
  if (!context) {
    throw new Error(
      "useCreateInvoice hook must be used within a CustomerProvider",
    );
  }
  return context;
};
