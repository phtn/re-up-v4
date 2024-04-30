import { svix } from "@src/lib/svix";

/**
 * @name getEventTypes
 * @description svix client: list event types
 * @location \@server/svix/event-type.ts
 */
export const getEventTypes = async () =>
  await svix.eventType.list().then((res) => res);
