import { GetOneResource } from "../resource/copperx/common";
import { CreateCustomerResource } from "../resource/copperx/customer";
import { CreateInvoiceResource } from "../resource/copperx/invoice";
import { AddProductResource } from "../resource/copperx/product";
import { procedure } from "../trpc";

export const CreateCustomerProcedure = procedure.input(CreateCustomerResource);
export const FindAllCustomer = procedure;
export const AddProductProcedure = procedure.input(AddProductResource);

export const CreateInvoiceProcedure = procedure.input(CreateInvoiceResource);
export const FindAll = procedure;
export const GetOne = procedure.input(GetOneResource);
