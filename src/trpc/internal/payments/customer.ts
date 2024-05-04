"use server";

import { type AddCustomerInternalSchema } from "@src/server/resource/payments/customer";
import { tRPC } from "@src/trpc/rsc";

export const addCustomerInternal = async (params: AddCustomerInternalSchema) =>
  await tRPC.addCustomerInternal.query(params);
