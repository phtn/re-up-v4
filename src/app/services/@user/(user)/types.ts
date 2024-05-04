import { type ProfileSchema } from "@src/server/resource/account";

export interface WebhookServiceProps {
  profile: ProfileSchema;
  webhookId: string | undefined;
}
export interface PaymentServiceProps {
  profile: ProfileSchema;
}
