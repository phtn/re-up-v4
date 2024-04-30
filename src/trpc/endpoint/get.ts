"use server";

import { type GetEndpointSchema } from "@src/server/resource/endpoint";
import { tRPC } from "../rsc";

/**
 * @name getEndpoint
 * @param params - {app_id, endpoint_id}
 * @location trpc/endpoint/get.ts
 */
export const getEndpoint = async ({ app_id, endpoint_id }: GetEndpointSchema) =>
  await tRPC.getEndpoint.query({ app_id, endpoint_id }).then((res) => res);
