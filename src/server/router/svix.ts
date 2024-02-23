import {
  createAppPortalProcedure,
  createWebhookProcedure,
} from "../procedure/svix";
import { createAppPortalAccess } from "../svix/appPortal";
import { createWebhook } from "../svix/webhook";
import { router } from "../trpc";

export const svixRouter = router({
  createAppPortal: createAppPortalProcedure.query(
    async ({ input }) => await createAppPortalAccess(input.id, input.resource),
  ),
  createWebhook: createWebhookProcedure.query(
    async ({ input }) => await createWebhook(input),
  ),
});
