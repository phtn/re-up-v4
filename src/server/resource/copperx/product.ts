import { z } from "zod";
import { Currency, Interval, PaymentType } from "./common";

//MAX 9223372036854775807

const DefaultPriceData = z.object({
  type: PaymentType,
  currency: Currency,
  unitAmount: z.number(),
  interval: Interval.or(z.undefined()),
  intervalCount: z.number().or(z.undefined()),
});

export const AddProductResource = z.object({
  name: z.string().min(1, "Product Name is required."),
  description: z.string().or(z.undefined()),
  isActive: z.boolean(),
  images: z.array(z.string()).or(z.undefined()),
  unitLabel: z.string().or(z.undefined()),
  url: z.string().or(z.undefined()),
  visibility: z.undefined(),
  defaultPriceData: DefaultPriceData,
});

export type AddProductSchema = z.infer<typeof AddProductResource>;

const PriceDataResponse = z.object({
  billingScheme: z.string().or(z.undefined()),
  createdAt: z.string().or(z.undefined()),
  currency: Currency,
  customPreset: z.string().or(z.null()),
  customUnitAmountSuggestion: z.string().or(z.undefined()),
  customUnitMax: z.string().or(z.null()),
  customUnitMin: z.string().or(z.null()),
  id: z.string(),
  interval: Interval.or(z.null()),
  intervalCount: z.number().or(z.null()),
  isActive: z.boolean(),
  metadata: z.record(z.string()).or(z.null()),
  product: z.object({
    name: z.string(),
    description: z.string().or(z.undefined()),
    images: z.array(z.string()).or(z.undefined()),
    unitLabel: z.string().or(z.undefined()),
    url: z.string().or(z.undefined()),
  }),
  productId: z.string(),
  type: PaymentType,
  unitAmount: z.string(),
  unitAmountDecimal: z.number().or(z.null()),
  updatedAt: z.string(),
  usageType: z.string().or(z.null()),
  visibility: z.number().or(z.undefined()),
});

export type PriceDataResponseSchema = z.infer<typeof PriceDataResponse>;

export const CopperxProductData = z.object({
  createdAt: z.string(),
  defaultPrice: PriceDataResponse,
  defaultPriceId: z.string(),
  description: z.string(),
  id: z.string(),
  images: z.array(z.string()),
  isActive: z.boolean(),
  metadata: z.record(z.string().or(z.number().or(z.boolean()))).or(z.null()),
  name: z.string(),
  unitLabel: z.string().or(z.undefined()),
  updatedAt: z.string(),
  url: z.string().or(z.undefined()),
  visibility: z.number().or(z.undefined()),
});

export type CopperxProductDataSchema = z.infer<typeof CopperxProductData>;

export const FindAllProductsResponse = z.object({
  count: z.number(),
  data: z.array(CopperxProductData),
  hasMore: z.boolean(),
  limit: z.number(),
  page: z.number(),
  query: z.object({
    limit: z.number(),
    page: z.number(),
  }),
});

export type FindAllProductResponseSchema = z.infer<
  typeof FindAllProductsResponse
>;
