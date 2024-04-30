import type { EventTypeOut, ListResponseEventTypeOut } from "svix";
import { z } from "zod";

export const CreateEventTypeResource = z.object({
  name: z.string(),
  description: z.string(),
  archived: z.boolean(),
  schemas: z.object({
    "1": z.object({
      description: z.string(),
      properties: z.object({
        invoiceId: z.object({
          description: z.string(),
          type: z.string(),
        }),
        userId: z.object({
          description: z.string(),
          type: z.string(),
        }),
      }),
      required: z.array(z.string()),
      title: z.string(),
      type: z.string(),
    }),
  }),
  featureFlag: z.string(),
});

export type CreateEventTypeSchema = z.infer<typeof CreateEventTypeResource>;

// const evenTypeResource: EventTypeIn = {
//   name: "user.signup",
//   description: "A user has signed up",
//   archived: false,
//   schemas: {
//     "1": {
//       description: "An invoice was paid by a user",
//       properties: {
//         invoiceId: { description: "The invoice id", type: "string" },
//         userId: { description: "The user id", type: "string" },
//       },
//       required: ["invoiceId", "userId"],
//       title: "Invoice Paid Event",
//       type: "object",
//     },
//   },
//   featureFlag: "cool-new-feature",
// };

export const CreateEventTypeResponse = z.object({
  name: z.string(),
  description: z.string(),
  archived: z.boolean(),
  featureFlag: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateEventTypeResponseSchema = z.infer<
  typeof CreateEventTypeResponse
>;

export const evenTypeResponse: EventTypeOut = {
  name: "user.signup",
  description: "A user has signed up",
  archived: false,
  featureFlag: "cool-new-feature",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const eventTypeResponse = {
  data: [
    {
      name: "user.signup",
      description: "A user has signed up",
      archived: false,
      schemas: {
        "1": {
          description: "An invoice was paid by a user",
          properties: {
            invoiceId: {
              description: "The invoice id",
              type: "string",
            },
            userId: {
              description: "The user id",
              type: "string",
            },
          },
          required: ["invoiceId", "userId"],
          title: "Invoice Paid Event",
          type: "object",
        },
      },
      createdAt: new Date("2019-08-24T14:15:22Z"),
      updatedAt: new Date("2019-08-24T14:15:22Z"),
      featureFlag: "cool-new-feature",
    },
  ],
  iterator: "iterator",
  prevIterator: "-iterator",
  done: true,
} satisfies ListResponseEventTypeOut;

export const ListEventTypeResponse = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      archived: z.boolean(),
      schemas: z.object({}),
      createdAt: z.date(),
      updatedAt: z.date(),
      featureFlag: z.string(),
    }),
  ),
});

export type ListEventTypeResponseSchema = z.infer<typeof ListEventTypeResponse>;

export const listEventTypeResponseHandler = (
  response: ListResponseEventTypeOut,
) => response.data.map((eventType) => eventType);

// ({
//         name: eventType.name,
//         description: eventType.description,
//         archived: eventType.archived,
//         schemas: eventType.schemas,
//         createdAt: eventType.createdAt,
//         updatedAt: eventType.updatedAt,
//         featureFlag: eventType.featureFlag,
//       })
