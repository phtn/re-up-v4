"use server";

import { type AddProductSchema } from "@src/server/resource/copperx/product";
import { tRPC } from "../rsc";

export const addProduct = async (params: AddProductSchema) =>
  await tRPC.addProduct.query(params).then((res) => res);
