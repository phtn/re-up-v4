import { addCustomerInternal } from "../firebase/payments/customer";
import { AddCustomerInternalProcedure } from "../procedure/payments/customer";
import { router } from "../trpc";

export const internalRouter = router({
  addCustomerInternal: AddCustomerInternalProcedure.query(async ({ input }) =>
    addCustomerInternal(input),
  ),
});
