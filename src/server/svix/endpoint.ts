import { svix } from "@src/lib/svix";
import {
  type GetEndpointSchema,
  endpointResponseHandler,
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

/**
 * @name getEndpoint
 * @description svix client
 * @location \@server/svix/endpoint.ts
 */
export const getEndpoint = async ({ app_id, endpoint_id }: GetEndpointSchema) =>
  await svix.endpoint.get(app_id, endpoint_id).then(endpointResponseHandler);
