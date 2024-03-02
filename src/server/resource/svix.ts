import { z } from "zod";

export const ValidInputFormat = z
  .string()
  .regex(/^[a-zA-Z0-9-_. ]+$/)
  .max(255);
export type ValidInputFormatSchema = z.infer<typeof ValidInputFormat>;

export const UniqueElements = z
  .array(ValidInputFormat)
  .max(10)
  .optional()
  .refine((arr) => new Set(arr).size === arr?.length, {
    message: "List must contain unique items.",
  });

export const AppPortalResource = z.object({
  id: z.string(),
  resource: z.object({
    featureFlags: z.array(ValidInputFormat),
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
  name: ValidInputFormat,
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

export const CreateEndpointResource = z.object({
  description: ValidInputFormat.max(255).optional().default(""),
  rateLimit: z.number().optional().default(64),
  uid: z.string().min(1),
  url: z.string().min(1),
  disabled: z.boolean().default(false),
  filterTypes: z.array(ValidInputFormat).optional(),
  channels: UniqueElements,
  metadata: z.record(z.string()).optional(),
});

export type CreateEndpointSchema = z.infer<typeof CreateEndpointResource>;
