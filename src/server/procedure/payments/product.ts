import { AddProductInternalResource } from "@src/server/resource/payments/product";
import { procedure } from "@src/server/trpc";

export const AddProductInternalProcedure = procedure.input(
  AddProductInternalResource,
);
