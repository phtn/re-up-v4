"use server";

import { type AddWebhookSchema } from "@src/server/resource/webhook";
import { tRPC } from "../rsc";

export const addWebhookDocToFirebase = async (params: AddWebhookSchema) =>
  await tRPC.addWebhook.query(params).then((res) => res);
