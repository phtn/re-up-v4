//sdk.invoiceController_create(

import { z } from "zod";
import { Currency, Interval, PaymentType } from "./common";

const CustomFields = z.object({
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
});

export const CreateInvoiceResource = z.object({
  description: z.string(),
  customFields: CustomFields,
  dueDate: z.string().datetime(),
  footer: z.string(),
  fromInvoiceId: z.string().uuid().or(z.undefined()),
  clientReferenceId: z.string(),
  visibility: z.undefined(),
  allowPromotionCodes: z.boolean(),
  customerId: z.string().uuid(),
  lineItems: z.object({
    data: z.array(
      z.object({
        priceId: z.string().uuid(),
        priceData: z.object({
          currency: Currency,
          interval: Interval.or(z.undefined()),
          intervalCount: z.number().or(z.undefined()),
          unitAmount: z.number(),
          productId: z.string().uuid(),
          productData: z.object({
            name: z.string(),
            description: z.string(),
            images: z.array(z.string()),
            unitLabel: z.string().or(z.undefined()),
            url: z.string().or(z.undefined()),
            visibility: z.undefined(),
          }),
          type: PaymentType,
        }),
        quantity: z.number(),
        periodStart: z.string().datetime().or(z.undefined()),
        periodEnd: z.string().datetime().or(z.undefined()),
      }),
    ),
  }),
  paymentSetting: z.object({
    allowedChains: z.array(z.object({ chainId: z.number() })),
    preferredChainId: z.number(),
    preferredCurrency: Currency,
    allowSwap: z.boolean(),
  }),
});

export type CreateInvoiceSchema = z.infer<typeof CreateInvoiceResource>;

export const FindAllInvoiceResponse = z.object({
  count: z.number(),
  data: z.array(CreateInvoiceResource),
  hasMore: z.boolean(),
  limit: z.number(),
  page: z.number(),
  query: z.object({
    limit: z.number(),
    page: z.number(),
  }),
});

export type FindAllInvoiceSchema = z.infer<typeof FindAllInvoiceResponse>;
