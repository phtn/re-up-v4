import { type AxiosInstance } from "axios";
import type {
  IcashCheckoutResponseSchema,
  IcashCheckoutSchema,
} from "../resource/icash";
import { icashCheckoutConfig, createCheckoutAxiosInstance } from "./axios";

const onCheckout = async (
  values: IcashCheckoutSchema,
  axiosInstance: AxiosInstance,
) => {
  const { data, status } =
    await axiosInstance.post<IcashCheckoutResponseSchema>(
      icashCheckoutConfig.url,
      values,
    );
  return { data, status };
};

export const icashCreateCheckout = async (values: IcashCheckoutSchema) => {
  const axiosInstance = createCheckoutAxiosInstance(icashCheckoutConfig);
  return await onCheckout(values, axiosInstance);
};

// const onPayout = async (
//   values: IcashPayoutSchema,
//   axiosInstance: AxiosInstance,
// ) => {
//   const { data, status } = await axiosInstance.post<IcashPayoutResponseSchema>(
//     icashPayoutConfig.url,
//     values,
//   );
//   return { data, status };
// };

// export const createInstapayPayoutSession = async (
//   values: IcashPayoutSchema,
// ) => {
//   const axiosInstance = createAxiosInstance(icashPayoutConfig);
//   return await onPayout(values, axiosInstance);
// };
