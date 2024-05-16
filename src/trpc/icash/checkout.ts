"use server";

import { type IcashCheckoutSchema } from "@src/server/resource/icash";
import { tRPC } from "../rsc";

/**
 * iCash checkout
 * @location trpc/icash/checkout
 */
export const createIcashCheckout = async (values: IcashCheckoutSchema) => {
  return await tRPC.icashCreateCheckout.query(values);
};
