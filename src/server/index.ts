import { accountRouter } from "./router/account";
import { netRouter } from "./router/net";
import { svixRouter } from "./router/svix";
import { webhookRouter } from "./router/webhook";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(
  netRouter,
  accountRouter,
  svixRouter,
  webhookRouter,
);

export type AppRouter = typeof appRouter;
