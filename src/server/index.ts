import { netRouter } from "./router/net";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(netRouter);

export type AppRouter = typeof appRouter;
