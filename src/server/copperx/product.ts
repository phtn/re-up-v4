import sdk from "@api/copperx";
import type { AddProductSchema } from "../resource/copperx/product";

export const addProductSession = async (params: AddProductSchema) => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);
  return await sdk
    .productController_create(params)
    .then((res) => JSON.stringify(res));
};

export const findAllProducts = async () => {
  sdk
    .auth(`${process.env.COPPERX_LIVE}`)
    .server(`${process.env.COPPERX_BASEURL}`);

  const response = await sdk
    .productController_findAll({ limit: 50 })
    .then((res) => JSON.stringify(res));

  return response;
};
