"use server";

import { type AppPortalSchema } from "@src/server/resource/svix";
import { tRPC } from "../rsc";

/**
 * @name createAppPortalAccess
 * @location trpc/svix/appPortal
 */
export const createAppPortalAccess = async (params: AppPortalSchema) =>
  await tRPC.createAppPortal.query(params).then((res) => res);
