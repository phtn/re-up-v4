import { z } from "zod";
import { UniqueElements, ValidInputFormat } from "./svix";
import { type EndpointOut } from "svix";
// import { type EndpointOut } from "svix";

/**
 * @name CreateEndpointResource
 * @location @server/resource/endpoint
 */
export const CreateEndpointResource = z.object({
  description: ValidInputFormat.max(255).default(""),
  rateLimit: z.number(),
  uid: z.string().min(1),
  url: z.string().min(1),
  disabled: z.boolean().default(false),
  filterTypes: z.array(ValidInputFormat).or(z.undefined()).optional(),
  channels: UniqueElements.or(z.undefined()).optional(),
  metadata: z.record(z.string()).optional(),
});

/**
 * @name CreateEndpointSchema
 * @location \@server/resource/endpoint
 */
export type CreateEndpointSchema = z.infer<typeof CreateEndpointResource>;

/**
 * @name CreateEndpointParams
 * @location \@server/resource/endpoint
 */
export const CreateEndpointParams = z.object({
  app_id: z.string().min(1),
  resource: CreateEndpointResource,
});

/**
 * @name CreateEndpointParamsSchema
 * @description app_id + resource
 * @location @server/resource/endpoint
 */
export type CreateEndpointParamsSchema = z.infer<typeof CreateEndpointParams>;

/**
 * @name CreateEndpointResponse
 * @location @server/resource/endpoint
 */
export const CreateEndpointResponse = z.object({
  id: z.string(),
  metadata: z.record(z.string()),
  description: z.string(),
  rateLimit: z.number().or(z.undefined()),
  uid: z.string().or(z.undefined()),
  url: z.string(),
  version: z.number(),
  disabled: z.boolean().or(z.undefined()),
  filterTypes: z.array(z.string()).or(z.undefined()),
  channels: z.array(z.string()).or(z.undefined()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * @name CreateEndpointResponseSchema
 * @location @server/resource/endpoint
 */
export type CreateEndpointResponseSchema = z.infer<
  typeof CreateEndpointResponse
>;

/**
 * @name AddEndpointParams
 * @location @server/resource/endpoint
 */
export const AddEndpointParams = z.object({
  app_id: z.string().min(1),
  userId: z.string().min(1),
  name: z.string().min(1),
  payload: CreateEndpointResponse,
});

/**
 * @name AddEndpointParamsScheme
 * @location @server/resource/endpoint
 */
export type AddEndpointParamsSchema = z.infer<typeof AddEndpointParams>;

/**
 * @name responseHandler (Endpoints)
 * @location @server/resource/endpoint
 */
export const responseHandler = (res: EndpointOut) => ({
  id: res.id,
  metadata: res.metadata,
  description: res.description,
  rateLimit: res.rateLimit,
  uid: res.uid,
  url: res.url,
  version: res.version,
  disabled: res.disabled,
  filterTypes: res.filterTypes,
  channels: res.channels,
  createdAt: res.createdAt,
  updatedAt: res.updatedAt,
});
// const endpointRes: CreateEndpointResponseSchema = {
//   id: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
//   metadata: {
//     property1: "string",
//     property2: "string",
//   },
//   description: "string",
//   rateLimit: 0,
//   uid: "unique-ep-identifier",
//   url: "https://example.com/webhook/",
//   version: 1,
//   disabled: false,
//   filterTypes: ["user.signup", "user.deleted"],
//   channels: ["project_123", "group_2"],
//   createdAt: "2019-08-24T14:15:22Z",
//   updatedAt: "2019-08-24T14:15:22Z",
// } satisfies EndpointOut;
