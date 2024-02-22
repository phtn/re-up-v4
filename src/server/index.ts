import { accountRouter } from "./router/account";
import { netRouter } from "./router/net";
import { svixRouter } from "./router/svix";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(netRouter, accountRouter, svixRouter);

export type AppRouter = typeof appRouter;
