import { AppPortalResource, CreateWebhookResource } from "../resource/svix";
import { procedure } from "../trpc";

export const createAppPortalProcedure = procedure.input(AppPortalResource);
export const createWebhookProcedure = procedure.input(CreateWebhookResource);
