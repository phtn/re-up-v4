"use server";

import { tRPC } from "../rsc";

export const getCryptoPrices = async () =>
  await tRPC.getCryptoPrices.query().then((res) => res);
