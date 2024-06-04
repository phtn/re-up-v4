import {
  createCustomerAccount,
  findAllCustomers,
  getCustomer,
  deleteCustomer,
} from "../copperx/customer";
import {
  getInvoice,
  createInvoice,
  findAllInvoices,
  sendInvoice,
} from "../copperx/invoice";
import { addProductSession, findAllProducts } from "../copperx/product";
import {
  AddProductProcedure,
  CreateCustomerProcedure,
  CreateInvoiceProcedure,
  FindAll,
  FindAllCustomer,
  FindAllProductsProcedure,
  GetOne,
  SendInvoiceProcedure,
} from "../procedure/copperx";
import { router } from "../trpc";

export const copperxCustomerRouter = router({
  createCustomer: CreateCustomerProcedure.query(
    async ({ input }) => await createCustomerAccount(input).then((res) => res),
  ),
  getCustomer: GetOne.query(
    async ({ input }) => await getCustomer(input).then((res) => res),
  ),
  deleteCustomer: GetOne.query(
    async ({ input }) => await deleteCustomer(input).then((res) => res),
  ),
  findAllCustomers: FindAllCustomer.query(
    async () => await findAllCustomers().then((res) => res),
  ),
});

export const copperxProductRouter = router({
  addProduct: AddProductProcedure.query(
    async ({ input }) => await addProductSession(input).then((res) => res),
  ),
  findAllProducts: FindAllProductsProcedure.query(
    async () => await findAllProducts(),
  ),
});

export const copperxInvoiceRouter = router({
  createInvoice: CreateInvoiceProcedure.query(
    async ({ input }) => await createInvoice(input).then((res) => res),
  ),
  getInvoice: GetOne.query(async ({ input }) => await getInvoice(input)),
  sendInvoice: SendInvoiceProcedure.query(
    async ({ input }) => await sendInvoice(input),
  ),
  findAllInvoices: FindAll.query(
    async () => await findAllInvoices().then((res) => res),
  ),
});
