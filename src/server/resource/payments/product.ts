import { z } from "zod";
import { CopperxProductData } from "../copperx/product";

export const AddProductInternalResource = z.object({
  responseData: CopperxProductData,
  id: z.string().or(z.undefined()),
  userId: z.string().or(z.undefined()),
});

export type AddProductInternalSchema = z.infer<
  typeof AddProductInternalResource
>;
