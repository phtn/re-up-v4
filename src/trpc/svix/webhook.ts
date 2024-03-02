"use server";

import type {
  CreateEndpointSchema,
  CreateWebhookSchema,
} from "@src/server/resource/svix";
import { tRPC } from "../rsc";

/**
 * @name createWebhook
 * @param input - CreateWebhookSchema
 * @location server/trpc/svix/webhook.ts
 */
export const createWebhook = async (input: CreateWebhookSchema) =>
  await tRPC.createWebhook.query(input).then((res) => res);

/**
 * @name createEndpoint
 * @param input - CreateEndpointSchema
 * @location server/trpc/svix/webhook.ts
 */
export const createEndpoint = async (input: CreateEndpointSchema) =>
  await tRPC.createEndpoint.query(input).then((res) => res);
