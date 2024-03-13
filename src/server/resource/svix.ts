import { z } from "zod";

/**
 * @name ValidInputFormat
 * @description /^[a-zA-Z0-9-_. ]+$/
 * @nonEmpty
 * @maxLength 255
 * @location @server/svix
 */
export const ValidInputFormat = z
  .string()
  .regex(/^[a-zA-Z0-9-_. ]+$/)
  .min(1)
  .max(255);
export type ValidInputFormatSchema = z.infer<typeof ValidInputFormat>;

/**
 * @name UniqueElements Array
 * @description Max 10 elements
 * @optional
 * @location @server/svix
 */

export const UniqueElements = z
  .array(z.string())
  .nonempty()
  .max(10)
  .refine(
    (data) => {
      const set = new Set(data);
      return set.size === data.length;
    },
    {
      message: "Items must be unique",
    },
  )
  .or(z.undefined());

// export const UniqueElements = z
//   .array(ValidInputFormat)
//   .max(10)
//   .optional()
//   .refine((arr) => new Set(arr).size === arr?.length, {
//     message: "List must contain unique items.",
//   });

/**
 * @name AppPortalResource
 * @description Create Portal
 * @requires webhook app_id
 * @location @server/svix
 */
export const AppPortalResource = z.object({
  id: z.string(),
  resource: z.object({
    featureFlags: z.array(ValidInputFormat),
    expiry: z.number().or(z.undefined()),
  }),
});

export type AppPortalSchema = z.infer<typeof AppPortalResource>;

/**
 * @name AppPortalResponse
 * @location @server/svix
 */
export const AppPortalResponse = z.object({
  token: z.string(),
  url: z.string(),
});

export type AppPortalResponseSchema = z.infer<typeof AppPortalResponse>;

/**
 * @name CreateWebhookResource
 * @location @server/resource/svix
 */
export const CreateWebhookResource = z.object({
  name: ValidInputFormat,
  rateLimit: z.number().optional(),
  uid: z.string().optional(),
  metadata: z.record(z.string()).optional(),
});

/**
 * @name CreateWebhookSchema
 * @location @server/resource/svix
 */
export type CreateWebhookSchema = z.infer<typeof CreateWebhookResource>;

/**
 * @name CreateWebhookResponse
 * @location @server/resource/svix
 */
export const CreateWebhookResponse = z.object({
  uid: z.string(),
  name: z.string(),
  rateLimit: z.number(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  metadata: z.record(z.string()),
});

/**
 * @name CreateWebhookResponseSchema
 * @location @server/resource/svix
 */
export type CreateWebhookResponseSchema = z.infer<typeof CreateWebhookResponse>;
