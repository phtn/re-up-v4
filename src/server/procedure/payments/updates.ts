import { UpdatePaymentInternalResource } from "@src/server/resource/payments/updates";
import { procedure } from "@src/server/trpc";

export const UpdatePaymentInternalProcedure = procedure.input(
  UpdatePaymentInternalResource,
);
