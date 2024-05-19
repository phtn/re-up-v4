import { addCustomerInternal } from "../firebase/payments/customer";
import { addInvoiceInternal } from "../firebase/payments/invoice";
import { addProductInternal } from "../firebase/payments/product";
import { AddCustomerInternalProcedure } from "../procedure/payments/customer";
import { AddInvoiceInternalProcedure } from "../procedure/payments/invoice";
import { AddProductInternalProcedure } from "../procedure/payments/product";
import { router } from "../trpc";

export const internalRouter = router({
  addCustomerInternal: AddCustomerInternalProcedure.query(async ({ input }) =>
    addCustomerInternal(input),
  ),
  addProductInternal: AddProductInternalProcedure.query(
    async ({ input }) => await addProductInternal(input),
  ),
  addInvoiceInternal: AddInvoiceInternalProcedure.query(
    async ({ input }) => await addInvoiceInternal(input),
  ),
});

/**
1: 23
2: 15
5: 7
10: 4
20: 2
40: 1
2x: 1
7x: 1
*/
