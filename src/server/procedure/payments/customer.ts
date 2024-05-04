import { AddCustomerInternalResource } from "@src/server/resource/payments/customer";
import { procedure } from "@src/server/trpc";

export const AddCustomerInternalProcedure = procedure.input(
  AddCustomerInternalResource,
);
