"use server";

import { type UpdatePaymentInternalSchema } from "@src/server/resource/payments/updates";
import { tRPC } from "@src/trpc/rsc";

export const updatePaymentInternal = async (
  params: UpdatePaymentInternalSchema,
) => await tRPC.updatePaymentInternal.query(params);
