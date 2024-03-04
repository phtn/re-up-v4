import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * @name router @trpc
 */
export const router = t.router;

/**
 * @name procedure @trpc
 */
export const procedure = t.procedure;

/**
 * @name mergeRouters @trpc
 */
export const mergeRouters = t.mergeRouters;
