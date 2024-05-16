import sdk from "@api/copperx";
import type { CreateCustomerSchema } from "../resource/copperx/customer";
import type { GetOneSchema } from "../resource/copperx/common";

export const createCustomerAccount = async (params: CreateCustomerSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);

  return await sdk.customerController_create(params).then((res) => res);
};

export const getCustomer = async (params: GetOneSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);
  return await sdk.customerController_get(params).then((res) => res);
};

export const deleteCustomer = async (params: GetOneSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);
  return await sdk
    .customerController_delete(params)
    .then((res) => JSON.stringify(res));
};

export const findAllCustomers = async () => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);

  const response = await sdk
    .customerController_findAll({
      limit: 50,
      // ids: "14f80426-ae43-4602-a434-f3a4c5af2021",
      // "859f2845-9934-43f9-8064-c17e44b80040",
      // ids: "14f80426-ae43-4602-a434-f3a4c5af2021",
      // ids: "859f2845-9934-43f9-8064-c17e44b80040",
    })
    .then((res) => JSON.stringify(res));

  return response;
};
