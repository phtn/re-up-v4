"use server";

import { type AddInvoiceInternalSchema } from "@src/server/resource/payments/invoice";
import { tRPC } from "@src/trpc/rsc";

export const addInvoiceInternal = async (params: AddInvoiceInternalSchema) =>
  await tRPC.addInvoiceInternal.query(params);
