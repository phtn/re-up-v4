import { procedure, router } from "../trpc";

export const netRouter = router({
  netCheck: procedure.query(async () => `tRPC Network Online`),
});
