import { z } from "zod";
import { AppPortalResponse, CreateWebhookResponse } from "./svix";
import { UserId } from "./account";

export const WebhookPayloadResource = z.object({
  webhook: CreateWebhookResponse,
  portal: AppPortalResponse,
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

export type WebhookPayloadSchema = z.infer<typeof WebhookPayloadResource>;

export const WebhookDataResource = z.object({
  id: z.string(),
  webhook: CreateWebhookResponse,
  portal: AppPortalResponse,
  endpoints: z.array(z.object({})).or(z.undefined()),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

export type WebhookDataSchema = z.infer<typeof WebhookDataResource>;

export const AddWebhookResource = z.object({
  userId: UserId,
  payload: WebhookPayloadResource,
});

export type AddWebhookSchema = z.infer<typeof AddWebhookResource>;
