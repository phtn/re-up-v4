"use server";

import type { GetOneSchema } from "@src/server/resource/copperx/common";
import type { CreateCustomerSchema } from "@src/server/resource/copperx/customer";
import { tRPC } from "../rsc";

export const createCustomer = async (params: CreateCustomerSchema) =>
  await tRPC.createCustomer.query(params).then((res) => JSON.stringify(res));

export const getCustomer = async (params: GetOneSchema) =>
  await tRPC.getCustomer.query(params).then((res) => res);

export const deleteCustomer = async (params: GetOneSchema) =>
  await tRPC.deleteCustomer.query(params).then((res) => res);

export const findAllCustomers = async () =>
  await tRPC.findAllCustomers.query().then((res) => res);
