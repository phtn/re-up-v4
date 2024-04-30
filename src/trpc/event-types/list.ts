"use server";
import { tRPC } from "../rsc";

export const listEventTypes = async () =>
  await tRPC.getEventTypes.query().then((res) => JSON.stringify(res));
