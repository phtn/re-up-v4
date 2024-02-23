"use server";

import { type CreateWebhookSchema } from "@src/server/resource/svix";
import { tRPC } from "../rsc";

export const createWebhook = async (input: CreateWebhookSchema) =>
  await tRPC.createWebhook.query(input).then((res) => res);
