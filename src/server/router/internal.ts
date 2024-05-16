import { addCustomerInternal } from "../firebase/payments/customer";
import { addProductInternal } from "../firebase/payments/product";
import { AddCustomerInternalProcedure } from "../procedure/payments/customer";
import { AddProductInternalProcedure } from "../procedure/payments/product";
import { router } from "../trpc";

export const internalRouter = router({
  addCustomerInternal: AddCustomerInternalProcedure.query(async ({ input }) =>
    addCustomerInternal(input),
  ),
  addProductInternal: AddProductInternalProcedure.query(
    async ({ input }) => await addProductInternal(input),
  ),
});
