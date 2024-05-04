import sdk from "@api/copperx";
import type { CreateInvoiceSchema } from "../resource/copperx/invoice";

export const createInvoice = async (params: CreateInvoiceSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);

  return await sdk
    .invoiceController_create(params)
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
