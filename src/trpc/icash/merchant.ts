"use server";

import type {
  IcashAuthSchema,
  IcashCreateVASchema,
  IcashGetVASchema,
  IcashGenQRSchema,
} from "@src/server/resource/icash";
import { tRPC } from "../rsc";

/**
 * @name icash auth - server/trpc
 */
export const icashAuth = async (values: IcashAuthSchema) =>
  await tRPC.icashAuth.query(values).then((res) => res);

/**
 * @name icash create virtual account - server/trpc
 */
export const icashCreateVA = async (values: IcashCreateVASchema) =>
  await tRPC.icashCreateVA.query(values).then((res) => res);

/**
 * @name icash get virtual account - server/trpc
 */
export const icashGetVA = async (values: IcashGetVASchema) =>
  await tRPC.icashGetVA.query(values).then((res) => res);

/**
 * @name generateQRCode - server/trpc
 */
export const icashGenQRCode = async (values: IcashGenQRSchema) =>
  await tRPC.icashGenQRCode.query(values).then((res) => res);
