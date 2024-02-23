import { AddWebhookResource } from "../resource/webhook";
import { procedure } from "../trpc";

export const addWebhookProcedure = procedure.input(AddWebhookResource);
