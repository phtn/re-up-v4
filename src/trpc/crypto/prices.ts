"use server";

import type { CMCIDSchema } from "@src/server/resource/cmc/crypto";
import { tRPC } from "../rsc";

export const getCryptoPrices = async (id: CMCIDSchema) =>
  await tRPC.getCryptoPrices.query(id).then((res) => res);
