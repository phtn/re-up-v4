import { z } from "zod";
import { CopperxCustomerData } from "../copperx/customer";

export const AddCustomerInternalResource = z.object({
  customerReferenceId: z.string().or(z.undefined()),
  responseData: CopperxCustomerData,
  id: z.string().or(z.undefined()),
  userId: z.string(),
});

export type AddCustomerInternalSchema = z.infer<
  typeof AddCustomerInternalResource
>;
