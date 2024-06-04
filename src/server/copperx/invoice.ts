import sdk from "@api/copperx";
import type {
  CreateInvoiceSchema,
  SendInvoiceSchema,
} from "../resource/copperx/invoice";
import type { GetOneSchema } from "../resource/copperx/common";

export const createInvoice = async (params: CreateInvoiceSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);

  return await sdk
    .invoiceController_create(params)
    .then((res) => JSON.stringify(res));
};

export const getInvoice = async (params: GetOneSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);
  return await sdk
    .invoiceController_get(params)
    .then((res) => JSON.stringify(res));
};

export const sendInvoice = async (params: SendInvoiceSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);
  return await sdk
    .invoiceController_finalizeAndSendInvoice(params.body, params.metadata)
    .then((res) => JSON.stringify(res));
};

export const findAllInvoices = async () => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);

  return await sdk
    .invoiceController_getAll()
    .then((res) => JSON.stringify(res));
};
