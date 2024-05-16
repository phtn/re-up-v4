"use server";

import { type AddProductInternalSchema } from "@src/server/resource/payments/product";
import { tRPC } from "@src/trpc/rsc";

export const addProductInternal = async (params: AddProductInternalSchema) =>
  await tRPC.addProductInternal.query(params);
