"use server";

import type { CreateWebhookSchema } from "@src/server/resource/svix";
import { tRPC } from "../rsc";

/**
 * @name createWebhook
 * @param input - CreateWebhookSchema
 * @location trpc/svix/webhook.ts
 */
export const createWebhook = async (input: CreateWebhookSchema) =>
  await tRPC.createWebhook.query(input).then((res) => res);
