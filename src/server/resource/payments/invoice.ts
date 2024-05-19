import { z } from "zod";
import { CopperxInvoiceResponseData } from "../copperx/invoice";

export const AddInvoiceInternalResource = z.object({
  responseData: CopperxInvoiceResponseData,
  id: z.string().or(z.undefined()),
  userId: z.string().or(z.undefined()),
});

export type AddInvoiceInternalSchema = z.infer<
  typeof AddInvoiceInternalResource
>;
