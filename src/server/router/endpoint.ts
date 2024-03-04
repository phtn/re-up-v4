import { addEndpoint } from "../firebase/endpoint";
import { addEndpointProcedure } from "../procedure/endpoint";
import { router } from "../trpc";

export const endpointRouter = router({
  addEndpoint: addEndpointProcedure.query(
    async ({ input }) => await addEndpoint(input),
  ),
});
