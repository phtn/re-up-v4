import { accountRouter } from "./router/account";
import {
  copperxInvoiceRouter,
  copperxProductRouter,
  copperxCustomerRouter,
} from "./router/copperx";
import { endpointRouter } from "./router/endpoint";
import { eventTypeRouter } from "./router/event-type";
import { internalRouter } from "./router/internal";
import { messageRouter } from "./router/message";
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
  eventTypeRouter,
  messageRouter,
  copperxCustomerRouter,
  copperxProductRouter,
  copperxInvoiceRouter,
  internalRouter,
);

export type AppRouter = typeof appRouter;
