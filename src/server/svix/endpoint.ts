import { svix } from "@src/lib/svix";
import {
  responseHandler,
  type CreateEndpointParamsSchema,
} from "../resource/endpoint";

/**
 * @name createEndpoint
 * @description svix client
 * @location \@server/svix/endpoint.ts
 */
export const createEndpoint = async (input: CreateEndpointParamsSchema) =>
  await svix.endpoint
    .create(input.app_id, input.resource)
    .then(responseHandler);
