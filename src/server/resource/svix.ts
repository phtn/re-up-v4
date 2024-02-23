import { z } from "zod";

export const AppPortalResource = z.object({
  id: z.string(),
  resource: z.object({
    featureFlags: z.array(z.string()),
    expiry: z.number().or(z.undefined()),
  }),
});

export type AppPortalSchema = z.infer<typeof AppPortalResource>;

export const AppPortalResponse = z.object({
  token: z.string(),
  url: z.string(),
});

export type AppPortalResponseSchema = z.infer<typeof AppPortalResponse>;

export const CreateWebhookResource = z.object({
  name: z.string(),
  rateLimit: z.number().optional(),
  uid: z.string().optional(),
  metadata: z.record(z.string()).optional(),
});

export type CreateWebhookSchema = z.infer<typeof CreateWebhookResource>;

export const CreateWebhookResponse = z.object({
  uid: z.string(),
  name: z.string(),
  rateLimit: z.number(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  metadata: z.record(z.string()),
});

export type CreateWebhookResponseSchema = z.infer<typeof CreateWebhookResponse>;
