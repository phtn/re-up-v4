import { svix } from "@src/lib/svix";
import type {
  ListMessagesByEndpointSchema,
  ListMessagesSchema,
} from "../resource/message";

/**
 * @name listMessages
 * @description svix client: list messages
 * @location \@server/svix/message.ts
 */
export const listMessages = async ({ app_id }: ListMessagesSchema) =>
  await svix.message.list(app_id).then((res) => res);

/**
 * @name listMessages
 * @description svix client: list messages
 * @location \@server/svix/message.ts
 */
export const listMessageAttemptsByEndpoint = async ({
  app_id,
  endpoint_id,
}: ListMessagesByEndpointSchema) =>
  await svix.messageAttempt
    .listByEndpoint(app_id, endpoint_id, { limit: 50 })
    .then((res) => res);
