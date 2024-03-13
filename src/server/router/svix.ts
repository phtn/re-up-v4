import { createEndpointProcedure } from "../procedure/endpoint";
import {
  createAppPortalProcedure,
  createWebhookProcedure,
} from "../procedure/svix";
import { createAppPortalAccess } from "../svix/appPortal";
import { createWebhook } from "../svix/webhook";
import { createEndpoint } from "../svix/endpoint";
import { router } from "../trpc";

/**
 * @name svixRouter
 * @description - Account Creation Routes.
 */
export const svixRouter = router({
  /**
   * @name createAppPortal
   * @location router/svix
   */
  createAppPortal: createAppPortalProcedure.query(
    async ({ input }) => await createAppPortalAccess(input.id, input.resource),
  ),
  /**
   * @name createWebhook
   * @location router/svix
   */
  createWebhook: createWebhookProcedure.query(
    async ({ input }) => await createWebhook(input),
  ),
  /**
   * @name createEndpoint
   * @location router/svix
   */
  createEndpoint: createEndpointProcedure.query(
    async ({ input }) => await createEndpoint(input),
    // async ({ input }) => input,
  ),
});
