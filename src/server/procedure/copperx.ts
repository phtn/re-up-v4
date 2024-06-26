import { GetOneResource } from "../resource/copperx/common";
import { CreateCustomerResource } from "../resource/copperx/customer";
import {
  CreateInvoiceResource,
  SendInvoiceResource,
} from "../resource/copperx/invoice";
import { AddProductResource } from "../resource/copperx/product";
import { procedure } from "../trpc";

export const CreateCustomerProcedure = procedure.input(CreateCustomerResource);
export const FindAllCustomer = procedure;

export const AddProductProcedure = procedure.input(AddProductResource);
export const FindAllProductsProcedure = procedure;

export const CreateInvoiceProcedure = procedure.input(CreateInvoiceResource);
export const SendInvoiceProcedure = procedure.input(SendInvoiceResource);
export const FindAllInvoices = procedure;

export const FindAll = procedure;
export const GetOne = procedure.input(GetOneResource);
