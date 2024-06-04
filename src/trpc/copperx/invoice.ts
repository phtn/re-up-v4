"use server";

import type {
  SendInvoiceSchema,
  CreateInvoiceSchema,
} from "@src/server/resource/copperx/invoice";
import { tRPC } from "../rsc";
import { type GetOneSchema } from "@src/server/resource/copperx/common";

export const createInvoice = async (params: CreateInvoiceSchema) =>
  await tRPC.createInvoice.query(params).then((res) => res);

export const getInvoice = async (params: GetOneSchema) =>
  await tRPC.getInvoice.query(params).then((res) => res);

export const sendInvoice = async (params: SendInvoiceSchema) =>
  await tRPC.sendInvoice.query(params).then((res) => res);

export const findAllInvoices = async () =>
  await tRPC.findAllInvoices.query().then((res) => res);
