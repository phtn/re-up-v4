import { AddInvoiceInternalResource } from "@src/server/resource/payments/invoice";
import { procedure } from "@src/server/trpc";

export const AddInvoiceInternalProcedure = procedure.input(
  AddInvoiceInternalResource,
);
