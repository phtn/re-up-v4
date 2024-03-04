import { accountRouter } from "./router/account";
import { endpointRouter } from "./router/endpoint";
import { netRouter } from "./router/net";
import { svixRouter } from "./router/svix";
import { webhookRouter } from "./router/webhook";
import { mergeRouters } from "./trpc";

/**
 * @name appRouter
 * @description - Merged Application Router
 */
export const appRouter = mergeRouters(
  netRouter,
  accountRouter,
  svixRouter,
  webhookRouter,
  endpointRouter,
);

export type AppRouter = typeof appRouter;
