import { addEndpoint } from "../firebase/endpoint";
import {
  addEndpointProcedure,
  getEndpointProcedure,
} from "../procedure/endpoint";
import { getEndpoint } from "../svix/endpoint";
import { router } from "../trpc";

export const endpointRouter = router({
  addEndpoint: addEndpointProcedure.query(
    async ({ input }) => await addEndpoint(input),
  ),
  getEndpoint: getEndpointProcedure.query(
    async ({ input }) => await getEndpoint(input),
  ),
});
