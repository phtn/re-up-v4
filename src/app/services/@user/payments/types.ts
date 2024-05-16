import type { CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import type { CopperxProductDataSchema } from "@src/server/resource/copperx/product";

export interface FormProps {
  userId: string | undefined;
  route?: string | undefined;
  customerList?: CopperxCustomerDataSchema[] | undefined;
  currentCustomerId: string | undefined;
  fetchingCustomers?: boolean;
  productList: CopperxProductDataSchema[] | undefined;
  fetchingProducts: boolean | undefined;
  productIdList: string[];
  onSelect: (id: string | undefined) => () => void;
  addProduct: (id: string) => () => void;
  removeProduct: (id: string) => () => void;
}

export interface ProductFormProps {
  userId: string | undefined;
  route?: string | undefined;
}

export interface CustomerFormProps {
  userId: string | undefined;
  route?: string | undefined;
}
