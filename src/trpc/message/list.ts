"use server";
import type {
  ListMessagesByEndpointSchema,
  ListMessagesSchema,
} from "@@resource/message";
import { tRPC } from "../rsc";

/**
 * @name listMessages
 * @param params - {app_id: string}
 * @location trpc/svix/message.ts
 */
export const listMessages = async (params: ListMessagesSchema) =>
  await tRPC.listMessages.query(params).then((res) => JSON.stringify(res));

/**
 * @name listMessagAttempts
 * @param params - {app_id, endpoint_id}
 * @location trpc/svix/message.ts
 */
export const listMessageAttempts = async (
  params: ListMessagesByEndpointSchema,
) =>
  await tRPC.listMessageAttemptsByEndpoint
    .query({ ...params })
    .then((res) => JSON.stringify(res));
