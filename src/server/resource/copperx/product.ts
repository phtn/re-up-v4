import { z } from "zod";
import { Currency, Interval, PaymentType } from "./common";

//MAX 9223372036854775807

const DefaultPriceData = z.object({
  type: PaymentType,
  currency: Currency,
  unitAmount: z.number(),
  interval: Interval,
  intervalCount: z.number(),
});

export const AddProductResource = z.object({
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  images: z.array(z.string()).or(z.undefined()),
  unitLabel: z.string(),
  url: z.string(),
  visibility: z.undefined(),
  defaultPriceData: DefaultPriceData,
});

export type AddProductSchema = z.infer<typeof AddProductResource>;
