import { accountRouter } from "./router/account";
import { netRouter } from "./router/net";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(netRouter, accountRouter);

export type AppRouter = typeof appRouter;
