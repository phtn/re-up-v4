//sdk.invoiceController_create(

import { z } from "zod";
import { Currency, Interval, PaymentType } from "./common";
import { CustomerDataObject } from "./customer";

const CustomFields = z.object({
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
});

const LineItem = z.object({
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
});

export type LineItemSchema = z.infer<typeof LineItem>;

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
    data: z.array(LineItem),
  }),
  paymentSetting: z.object({
    allowedChains: z.array(z.object({ chainId: z.number() })),
    preferredChainId: z.number(),
    preferredCurrency: Currency,
    allowSwap: z.boolean(),
  }),
});

export type CreateInvoiceSchema = z.infer<typeof CreateInvoiceResource>;

export const CopperxInvoiceData = z.object({
  allowPromotionCodes: z.boolean(),
  attemptCount: z.number().or(z.null()),
  attempted: z.boolean(),
  autoAdvance: z.boolean(),
  billingReason: z.string(),
  clientReferenceId: z.string(),
  collectionMethod: z.string(),
  createdAt: z.string(),
  currency: Currency,
  customer: CustomerDataObject,
  customerId: z.string().uuid(),
  description: z.string(),
  dueDate: z.string(),
  finalizeScheduleAt: z.string(),
  finalizedAt: z.string(),
  footer: z.string(),
  fromInvoiceId: z.string().uuid().or(z.undefined()),
  id: z.string().uuid(),
  invoiceNumber: z.string(),
  lineItems: z.object({
    data: z.array(LineItem),
  }),
  paymentSetting: z.object({
    allowedChains: z.array(z.object({ chainId: z.number() })),
    preferredChainId: z.number(),
    preferredCurrency: Currency,
    allowSwap: z.boolean(),
  }),
  total: z.number(),
});

export type CopperxInvoiceDataSchema = z.infer<typeof CopperxInvoiceData>;

export const FindAllInvoiceResponse = z.object({
  count: z.number(),
  data: z.array(
    z.object({
      allowPromotionCodes: z.boolean(),
      attemptCount: z.number().or(z.null()),
      attempted: z.boolean(),
      autoAdvance: z.boolean(),
      billingReason: z.string(),
      clientReferenceId: z.string(),
      collectionMethod: z.string(),
      createdAt: z.string(),
      currency: Currency,
      customer: CustomerDataObject,
      customerId: z.string().uuid(),
      description: z.string(),
      dueDate: z.string(),
      finalizeScheduleAt: z.string(),
      finalizedAt: z.string(),
      footer: z.string(),
      fromInvoiceId: z.string().uuid().or(z.undefined()),
      id: z.string().uuid(),
      invoiceNumber: z.string(),
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
      total: z.number(),
    }),
  ),
  hasMore: z.boolean(),
  limit: z.number(),
  page: z.number(),
  query: z.object({
    limit: z.number(),
    page: z.number(),
  }),
});

export type FindAllInvoiceSchema = z.infer<typeof FindAllInvoiceResponse>;

export const res = {
  page: 1,
  limit: 10,
  count: 1,
  hasMore: true,
  query: {
    page: 1,
    limit: 10,
    createdAt: {
      gt: "2020-01-01",
    },
  },
  data: [
    {
      id: "string",
      createdAt: "2024-05-04T10:57:16.813Z",
      updatedAt: "2024-05-04T10:57:16.813Z",
      organizationId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
      description: "string",
      total: "9223372036854775807",
      currency: "usdc",
      customerId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
      customer: {
        name: "string",
        email: "string",
        phone: "string",
        organizationName: "string",
        address: {
          line1: "string",
          line2: "string",
          city: "string",
          state: "string",
          postalCode: "string",
          country: "string",
        },
        id: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
        createdAt: "2024-05-04T10:57:16.813Z",
        updatedAt: "2024-05-04T10:57:16.813Z",
        customerReferenceId: "string",
        shipping: {
          name: "string",
          email: "string",
          phone: "string",
          organizationName: "string",
          address: {
            line1: "string",
            line2: "string",
            city: "string",
            state: "string",
            postalCode: "string",
            country: "string",
          },
        },
        taxIds: {
          object: "string",
          data: [
            {
              id: "string",
              createdAt: "2024-05-04T10:57:16.813Z",
              updatedAt: "2024-05-04T10:57:16.813Z",
              name: "string",
              value: "string",
              country: "string",
              customerId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
            },
          ],
        },
        visibility: 10,
        metadata: {},
        customerNumber: "string",
      },
      autoAdvance: true,
      collectionMethod: "charge_automatically",
      customFields: {
        fields: [
          {
            name: "string",
            value: "string",
          },
        ],
      },
      paymentSettingId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
      paymentSetting: {
        id: "string",
        createdAt: "2024-05-04T10:57:16.813Z",
        updatedAt: "2024-05-04T10:57:16.813Z",
        paymentMethodTypes: "wallet",
        allowedChains: [
          {
            chainId: 137,
          },
        ],
        allowedCurrencies: ["usdc", "usdt"],
        preferredChainId: 1,
        preferredCurrency: "usdc",
        allowSwap: false,
      },
      status: "draft",
      attempted: true,
      attemptCount: 1,
      nextPaymentAttempt: "2024-05-04T10:57:16.813Z",
      dueDate: "2024-05-04T10:57:16.813Z",
      footer: "string",
      fromInvoiceId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
      latestRevisionId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
      invoicePdfUrl: "string",
      invoiceNumber: "string",
      paid: true,
      paidOutOfBand: true,
      metadata: {},
      clientReferenceId: "string",
      lineItems: {
        object: "string",
        data: [
          {
            description: "string",
            periodStart: "2024-05-04T10:57:16.813Z",
            periodEnd: "2024-05-04T10:57:16.813Z",
            quantity: 1,
            price: {
              id: "string",
              createdAt: "2024-05-04T10:57:16.813Z",
              updatedAt: "2024-05-04T10:57:16.813Z",
              billingScheme: "per_unit",
              currency: "usdc",
              productId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
              interval: "day",
              intervalCount: 1,
              isActive: true,
              usageType: "licensed",
              type: "one_time",
              unitAmount: "9223372036854775807",
              unitAmountDecimal: "string",
              customUnitMax: "9223372036854775807",
              customUnitMin: "9223372036854775807",
              customPreset: "9223372036854775807",
              customUnitAmountSuggestions: ["string"],
              product: {
                id: "string",
                createdAt: "2024-05-04T10:57:16.813Z",
                updatedAt: "2024-05-04T10:57:16.813Z",
                name: "string",
                description: "string",
                isActive: true,
                images: ["string"],
                publicImages: ["string"],
                unitLabel: "string",
                url: "string",
                defaultPriceId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
                metadata: {},
                visibility: 10,
              },
              metadata: {},
              visibility: 10,
            },
          },
        ],
      },
      finalizedAt: "2024-05-04T10:57:16.813Z",
      paidAt: "2024-05-04T10:57:16.813Z",
      markedUncollectibleAt: "2024-05-04T10:57:16.813Z",
      visibility: 10,
      paymentIntentId: "c3611c05-df51-4b47-b601-f2eac02f4ef0",
      url: "string",
      subscriptionId: "string",
      periodStart: "2024-05-04T10:57:16.813Z",
      periodEnd: "2024-05-04T10:57:16.813Z",
      billingReason: "subscription_cycle",
      allowPromotionCodes: true,
      finalizeScheduleAt: "2024-05-04T10:57:16.813Z",
    },
  ],
};

// const newInvoiceResource = {
//   customFields: { fields: [{ name: "string", value: "string" }] },
//   lineItems: {
//     data: [
//       {
//         priceData: {
//           currency: "usdc",
//           productData: {
//             name: "string",
//             description: "string",
//             images: [
//               "66d25f22-62c2-4fea-8c9f-5dab2ac08cfd/c96e15ab-330f-4415-98ac-c175e024fe3b.png",
//             ],
//             unitLabel: "per",
//             url: "string",
//             visibility: 10,
//           },
//           unitAmount: 50000000000,
//           productId: "e7d0c717-e9d8-45b2-a123-2326d018b369",
//           type: "one_time",
//         },
//         quantity: 1,
//         priceId: "2ef87743-4e85-4e24-8198-7b9e259698a7",
//         periodStart: "2024-05-01T08:35:05.803Z",
//         periodEnd: "2024-05-01T08:35:05.803Z",
//       },
//     ],
//   },
//   paymentSetting: {
//     allowSwap: false,
//     allowedChains: [{ chainId: 1 }],
//     preferredChainId: 1,
//     preferredCurrency: "usdc",
//   },
//   description: "anything",
//   dueDate: "2024-05-08T15:59:59.999Z",
//   clientReferenceId: "1AE5REWUKK",
//   visibility: 10,
//   allowPromotionCodes: true,
//   customerId: "4ad8dc39-1649-4560-8eac-159375a0249c",
// };