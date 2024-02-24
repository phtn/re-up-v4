import { z } from "zod";
import { AppPortalResponse, CreateWebhookResponse } from "./svix";
import { UserId } from "./account";

export const WebhookPayloadResource = z.object({
  webhook: CreateWebhookResponse,
  portal: AppPortalResponse,
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

export const AddWebhookResource = z.object({
  userId: UserId,
  payload: WebhookPayloadResource,
});

export type WebhookPayloadSchema = z.infer<typeof WebhookPayloadResource>;
export type AddWebhookSchema = z.infer<typeof AddWebhookResource>;
