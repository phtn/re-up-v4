import { type CreateWebhookResource } from "@src/server/resource/webhook";
import { createWebhookId } from "@src/utils/helpers";
import { svix } from "@@lib/svix";
import type {
  ApplicationIn,
  EndpointIn,
  EndpointUpdate,
  EventTypeIn,
  MessageIn,
} from "svix";

export const example: CreateWebhookResource = {
  name: "Adam",
  rateLimit: 100,

  uid: createWebhookId(),
  metadata: {
    sexy: "yasss",
  },
};

// Create Webhook Application

export const createWebhook = async (resource: ApplicationIn) =>
  await svix.application.create(resource).then((res) => res);

export const getWebhook = async (app_id: string) =>
  await svix.application.get(app_id).then((res) => res);

export const updateWebhook = async (app_id: string, resource: ApplicationIn) =>
  await svix.application.update(app_id, resource).then((res) => res);

export const createEndpoint = async (app_id: string, resource: EndpointIn) =>
  await svix.endpoint.create(app_id, resource).then((res) => res);

export const getEndpoint = async (app_id: string, ept_id: string) =>
  await svix.endpoint.get(app_id, ept_id).then((res) => res);

export const updateEndpoint = async (
  app_id: string,
  ept_id: string,
  update: EndpointUpdate,
) => await svix.endpoint.update(app_id, ept_id, update).then((res) => res);

export const listMessages = async (app_id: string) =>
  await svix.message.list(app_id);

export const createMessage = async (app_id: string, resource: MessageIn) =>
  await svix.message.create(app_id, resource);

export const getMessage = async (app_id: string, msg_id: string) =>
  await svix.message.get(app_id, msg_id);

export const listEventTypes = async () => await svix.eventType.list();

export const createEventType = async (resource: EventTypeIn) =>
  await svix.eventType.create(resource);

export const getEventType = async (event_type_name: string) =>
  await svix.eventType.get(event_type_name);

/* 
 * Check Health
 *
 *curl -X 'GET' \
  'https://api.eu.svix.com/api/v1/health/' \
  -H 'Authorization: Bearer AUTH_TOKEN' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'
 *
 * */
