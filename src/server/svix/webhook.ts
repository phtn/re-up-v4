import { svix } from "@src/lib/svix";
import { type ApplicationOut } from "svix";
import type { CreateWebhookSchema } from "../resource/svix";

const returnAppResponse = (res: ApplicationOut) => ({
  id: res.id,
  uid: res.uid,
  name: res.name,
  rateLimit: res.rateLimit,
  createdAt: res.createdAt,
  updatedAt: res.updatedAt,
  metadata: res.metadata,
});

/**
 * @name createWebhook
 * @param input - CreateWebhookSchema
 * @location server/svix/webhook.ts
 */
export const createWebhook = async (input: CreateWebhookSchema) =>
  await svix.application.create(input).then(returnAppResponse);
