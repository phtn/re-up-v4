"use server";
import type {
  AddEndpointParamsSchema,
  CreateEndpointParamsSchema,
} from "@src/server/resource/endpoint";
import { tRPC } from "../rsc";

/**
 * @name createEndpoint
 * @param input - CreateEndpointSchema
 * @location trpc/svix/endpoint.ts
 */
export const createEndpoint = async (input: CreateEndpointParamsSchema) =>
  await tRPC.createEndpoint.query(input).then((res) => res);

/**
 * @name addEndpoint
 * @param input - AddEndpointSchema
 * @location trpc/svix/endpoint.ts
 * @todo Move to trpc/endpoint/
 */
export const addEndpoint = async (input: AddEndpointParamsSchema) =>
  await tRPC.addEndpoint.query(input).then((res) => res);
