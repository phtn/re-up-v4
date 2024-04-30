import type {
  ListResponseMessageAttemptOut,
  MessageAttemptOut,
  ListResponseMessageOut,
  MessageAttemptTriggerType,
} from "svix";
import { z } from "zod";

export const ListMessagesResource = z.object({
  app_id: z.string(),
});

export type ListMessagesSchema = z.infer<typeof ListMessagesResource>;

export const listMessageResponseHandler = (response: ListResponseMessageOut) =>
  response.data.map((message) => message);

export const listMessageResponse = {
  data: [
    {
      eventId: "unique-msg-identifier",
      eventType: "user.signup",
      payload: {
        email: "test@example.com",
        type: "user.created",
        username: "test_user",
      },
      channels: ["project_123", "group_2"],
      id: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
      timestamp: new Date("2019-08-24T14:15:22Z"),
      tags: ["project_1337"],
    },
  ],
  iterator: "iterator",
  prevIterator: "-iterator",
  done: true,
} satisfies ListResponseMessageOut;

export const ListMessagesResponse = z.object({
  data: z.array(
    z.object({
      eventId: z.string(),
      eventType: z.string(),
      payload: z.object({}),
      channels: z.array(z.string()),
      id: z.string(),
      timestamp: z.date(),
      tags: z.array(z.string()),
    }),
  ),
  iterator: z.string(),
  prevIterator: z.string(),
  done: z.boolean(),
});

export const ListMessagesByEndpointResource = z.object({
  app_id: z.string(),
  endpoint_id: z.string(),
});
export type ListMessagesByEndpointSchema = z.infer<
  typeof ListMessagesByEndpointResource
>;

export type ListMessagesResponseSchema = z.infer<typeof ListMessagesResponse>;

export const listMessagesByEndpointResponse = {
  data: [
    {
      url: "https://example.com/webhook/",
      response: "{}",
      responseStatusCode: 200,
      status: 0,
      triggerType: 0,
      msgId: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
      endpointId: "ep_1srOrx2ZWZBpBUvZwXKQmoEYga2",
      id: "atmpt_1srOrx2ZWZBpBUvZwXKQmoEYga2",
      timestamp: "2019-08-24T14:15:22Z",
      msg: {
        eventId: "unique-msg-identifier",
        eventType: "user.signup",
        payload: {
          email: "test@example.com",
          type: "user.created",
          username: "test_user",
        },
        channels: ["project_123", "group_2"],
        id: "msg_1srOrx2ZWZBpBUvZwXKQmoEYga2",
        timestamp: "2019-08-24T14:15:22Z",
        tags: ["project_1337"],
      },
    },
  ],
  iterator: "iterator",
  prevIterator: "-iterator",
  done: true,
};

export const ListMessagesByEndpointResponse = z.object({
  data: z.array(
    z.object({
      url: z.string(),
      response: z.string(),
      responseStatusCode: z.number(),
      status: z.number(),
      triggerType: z.custom<MessageAttemptTriggerType>((val) => val),
      msgId: z.string(),
      endpointId: z.string(),
      id: z.string(),
      timestamp: z.date(),
      msg: z.object({
        eventId: z.string(),
        eventType: z.string(),
        payload: z.object({}),
        channels: z.array(z.string()),
        id: z.string(),
        timestamp: z.date(),
        tags: z.array(z.string()),
      }),
    }),
  ),
  iterator: z.string(),
  prevIterator: z.string(),
  done: z.boolean(),
});

export type ListMessagesByEndpointResponseSchema = z.infer<
  typeof ListMessagesByEndpointResponse
>;

export const ListMessagesByEndpointResponseHandler = (
  response: ListResponseMessageAttemptOut,
) => response.data.map((message: MessageAttemptOut) => message);

export type ListMessagesByEndpointResponseHandlerSchema = ReturnType<
  typeof ListMessagesByEndpointResponseHandler
>;
