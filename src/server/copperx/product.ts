import sdk from "@api/copperx";
import type { AddProductSchema } from "../resource/copperx/product";

export const addProductSession = async (params: AddProductSchema) => {
  sdk
    .auth(`${process.env.COPPERX_TEST}`)
    .server(`${process.env.COPPERX_TESTURL}`);
  return await sdk.productController_create(params).then((res) => res);
};
