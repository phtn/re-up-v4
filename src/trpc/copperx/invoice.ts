"use server";

import { type CreateInvoiceSchema } from "@src/server/resource/copperx/invoice";
import { tRPC } from "../rsc";

export const createInvoice = async (params: CreateInvoiceSchema) =>
  await tRPC.createInvoice.query(params).then((res) => res);

export const findAllInvoices = async () =>
  await tRPC.findAllInvoices.query().then((res) => res);
