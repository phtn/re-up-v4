"use server";

import { tRPC } from "../rsc";

export const getFiatMap = async () =>
  await tRPC.getFiatMap.query().then((res) => res);
