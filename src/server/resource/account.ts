import { z } from "zod";

export const AccountType = z.union([
  z.literal("BUSINESS"),
  z.literal("PERSONAL"),
]);

export const CreateAccountResource = z.object({
  userId: z.string(),
  email: z.string().email(),
  accountType: AccountType,
});

export type NewUserPayload = z.infer<typeof CreateAccountResource>;

export const UserId = z.string().or(z.undefined());

export type UserIdSchema = z.infer<typeof UserId>;
