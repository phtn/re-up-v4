"use server";
import { type NewUserPayload } from "@@resource/account";
import { tRPC } from "@@trpc/rsc";

export const createUser = async (values: NewUserPayload) => {
  return await tRPC.createUser.query(values);
};
