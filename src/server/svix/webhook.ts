import { svix } from "@src/lib/svix";
import { type ApplicationOut } from "svix";
import type {
  CreateEndpointSchema,
  CreateWebhookSchema,
} from "../resource/svix";

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

/**
 * @name createEndpoint
 * @param input - CreateEndpointSchema
 * @location server/svix/webhook.ts
 */
export const createEndpoint = async (input: CreateEndpointSchema) =>
  await svix.endpoint.create(input.uid, input).then((res) => res);
