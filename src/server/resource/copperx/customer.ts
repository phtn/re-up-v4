import { z } from "zod";

const Address = z.object({
  line1: z.string(),
  line2: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

export const Shipping = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  organizationName: z.string(),
  address: Address,
});

const TaxId = z.object({
  object: z.string(),
  data: z.array(
    z.object({ name: z.string(), value: z.string(), country: z.string() }),
  ),
});

export const CreateCustomerResource = z.object({
  name: z.string(),
  phone: z.string(),
  organizationName: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string().or(z.undefined()),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  customerReferenceId: z.string().uuid(),
  shipping: Shipping.or(z.undefined()),
  visibility: z.undefined(),
  email: z.string().email(),
  taxIds: TaxId.or(z.undefined()),
});

export type CreateCustomerSchema = z.infer<typeof CreateCustomerResource>;
export const CustomerDataObject = CreateCustomerResource;
export type CustomerDataSchema = z.infer<typeof CustomerDataObject>;

const AddressResponse = z.object({
  line1: z.string().or(z.undefined()),
  line2: z.string().or(z.undefined()),
  city: z.string().or(z.undefined()),
  state: z.string().or(z.undefined()),
  postalCode: z.string().or(z.undefined()),
  country: z.string().or(z.undefined()),
});
const ShippingResponse = z.object({
  name: z.string().or(z.undefined()),
  email: z.string().or(z.undefined()),
  phone: z.string().or(z.undefined()),
  organizationName: z.string().or(z.undefined()),
  address: Address.or(z.undefined()),
});

export const CopperxCustomerData = z.object({
  address: AddressResponse.or(z.undefined()),
  createdAt: z.string().or(z.undefined()),
  customerNumber: z.string().or(z.undefined()),
  customerReferenceId: z.string().or(z.undefined()),
  email: z.string().or(z.undefined()),
  id: z.string().or(z.undefined()),
  metadata: z.object({}).or(z.undefined()),
  name: z.string().or(z.undefined()),
  organizationName: z.string().or(z.undefined()),
  phone: z.string().or(z.undefined()),
  shipping: ShippingResponse.or(z.undefined()),
  taxIds: TaxId.or(z.undefined()),
});

export type CopperxCustomerDataSchema = z.infer<typeof CopperxCustomerData>;

export const FindAllCustomerResponse = z.object({
  count: z.number(),
  data: z.array(CopperxCustomerData),
  hasMore: z.boolean(),
  limit: z.number(),
  page: z.number(),
  query: z.object({
    limit: z.number(),
    page: z.number(),
  }),
});

export type FindAllCustomerResponseSchema = z.infer<
  typeof FindAllCustomerResponse
>;
