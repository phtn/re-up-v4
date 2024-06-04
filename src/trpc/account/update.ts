"use server";
import { type UpdateUserDataSchema } from "@@resource/account";
import { tRPC } from "@@trpc/rsc";

export const updateUser = async (params: UpdateUserDataSchema) => {
  return await tRPC.updateUser.query(params);
};
