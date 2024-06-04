import { z } from "zod";

export const AccountType = z.union([
  z.literal("BUSINESS"),
  z.literal("PERSONAL"),
]);

export const CreateAccountResource = z.object({
  userId: z.string().or(z.undefined()),
  email: z.string().email().or(z.null().or(z.undefined())),
  accountType: AccountType,
});

export type NewUserPayload = z.infer<typeof CreateAccountResource>;

export const UserId = z.string().or(z.undefined());

export type UserIdSchema = z.infer<typeof UserId>;

const ProfileResource = z.object({
  userId: UserId,
  accountType: AccountType,
  address: z.object({
    street: z.string().or(z.null()),
    city: z.string().or(z.null()),
    state: z.string().or(z.null()),
    zip: z.string().or(z.null()),
    country: z.string().or(z.null()),
  }),
  displayName: z.string().or(z.null()),
  completeName: z.string().or(z.null()),
  createdAt: z.number(),
  credentials: z.array(z.object({}).default([])),
  email: z.string().email(),
  endpointCount: z.number().default(0),
  firstName: z.string().or(z.null()),
  isComplete: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  premium: z.boolean().default(false),
  updatedAt: z.number(),
  webhookCount: z.number().default(0),
  van: z.string(),
});

export type ProfileSchema = z.infer<typeof ProfileResource>;

export const UpdateUserDataResource = z.object({
  userId: z.string().or(z.undefined()),
  payload: z.record(
    z.string(),
    z.union([
      z.number(),
      z.boolean(),
      z.date(),
      z.null(),
      z.undefined(),
      z.record(z.string()),
    ]),
  ),
});

export type UpdateUserDataSchema = z.infer<typeof UpdateUserDataResource>;
