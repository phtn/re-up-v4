import { type AddCustomerFormSchema } from "../customers/add-customer/(form)/schema";

export interface AddCustomerHookParams {
  data: AddCustomerFormSchema;
  userId: string;
  customerId: string;
}
