import type { EndpointIn, EventTypeIn, MessageIn } from "svix";
import { type CSSProperties, type ReactNode } from "react";

export interface WResource {
  name: string;
  rateLimit?: number;
  uid?: string;
  metadata: Record<string, string>;
}

export interface WResponse {
  uid: string;
  name: string;
  rateLimit: number; // >= 1
  id: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, string>;
}

export const endpointIn: EndpointIn = {
  description: "An example endpoint name",
  rateLimit: 250,
  uid: "unique-ep-identifier",
  url: "https://example.com/webhook/",
  disabled: false,
  filterTypes: ["user.signup", "user.deleted"],
  channels: ["project_123", "group_2"],
  metadata: {},
};

export const endpointOut: EndpointIn = {
  metadata: {
    property1: "string",
    property2: "string",
  },
  description: "string",
  rateLimit: 0,
  uid: "unique-ep-identifier",
  url: "https://example.com/webhook/",
  version: 1,
  disabled: false,
  filterTypes: ["user.signup", "user.deleted"],
  channels: ["project_123", "group_2"],
};

export const appPortalResponse = {
  url: "https://app.svix.com/login#key=eyJhcHBJZCI6ICJhcHBfMXRSdFl",
  token: "appsk_kV3ts5tKPNJN4Dl25cMTfUNdmabxbX0O",
};

export const messageOut: MessageIn = {
  eventId: "unique-msg-identifier",
  eventType: "user.signup",
  payload: {
    email: "test@example.com",
    type: "user.created",
    username: "test_user",
  },
  channels: ["project_123", "group_2"],
  payloadRetentionPeriod: 90,
  application: undefined,
  tags: ["my_tag", "other"],
  transformationsParams: null,
};

export type GetMessageResource = {
  app_id: string;
  msg_id: string;
};

const evenTypeResource: EventTypeIn = {
  name: "user.signup",
  description: "A user has signed up",
  archived: false,
  schemas: {
    "1": {
      description: "An invoice was paid by a user",
      properties: {
        invoiceId: { description: "The invoice id", type: "string" },
        userId: { description: "The user id", type: "string" },
      },
      required: ["invoiceId", "userId"],
      title: "Invoice Paid Event",
      type: "object",
    },
  },
  featureFlag: "cool-new-feature",
};

export type CreateEventTypeResource = typeof evenTypeResource;

export interface AppPortalProps {
  url: string | undefined | null;
  style?: CSSProperties;
  loadingIndicator?: ReactNode;
  darkMode?: boolean;
  fontFamily?: string;
  icon?: string;
  primaryColor?: string;
  fullSize?: boolean;
}
