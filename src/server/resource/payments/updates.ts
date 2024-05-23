import { z } from "zod";

export const UpdatePaymentInternalResource = z.object({
  payload: z.record(
    z.string().or(z.number().or(z.boolean().or(z.date().or(z.undefined())))),
  ),
  document: z.union([
    z.literal("customers"),
    z.literal("invoices"),
    z.literal("products"),
  ]),
  docId: z.string().or(z.undefined()),
  userId: z.string().or(z.undefined()),
});

export type UpdatePaymentInternalSchema = z.infer<
  typeof UpdatePaymentInternalResource
>;
