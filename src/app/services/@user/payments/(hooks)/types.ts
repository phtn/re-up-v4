import { type AddCustomerFormSchema } from "../customers/add-customer/(form)/schema";
import { type AddProductFormSchema } from "../products/add-product/(form)/schema";
import { type CreateInvoiceFormSchema } from "../invoices/create/(form)/schema";
import type {
  CopperxProductDataSchema,
  FindAllProductResponseSchema,
} from "@src/server/resource/copperx/product";

export interface AddCustomerHookParams {
  data: AddCustomerFormSchema;
  userId: string;
  customerId: string;
}

export interface AddProductHookParams {
  data: AddProductFormSchema;
  userId: string | undefined;
}

export interface CreateInvoiceHookParams {
  data: CreateInvoiceFormSchema;
  userId: string;
}

export interface CreateInvoiceLineItemParams {
  products: CopperxProductDataSchema[] | undefined;
}

export interface GetProductItems {
  productList: FindAllProductResponseSchema | undefined;
}

export const MaxSafeValue = 9223372036854775807n;
