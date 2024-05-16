import { type AxiosInstance } from "axios";
import {
  type IcashGenQRSchema,
  type IcashGenQRResponseSchema,
  type IcashAuthSchema,
  type IcashAuthResponseSchema,
  type IcashCreateVASchema,
  type IcashCreateVAResponseSchema,
  type IcashGetVASchema,
  type IcashGetVAResponseSchema,
  icashCreateVAConfig,
  icashGetVAConfig,
  icashGenQRConfig,
} from "../resource/icash";

import { createMerchantAxiosInstance, icashAuthConfig } from "./axios";

export const onGenQR = async (
  values: IcashGenQRSchema,
  axiosInstance: AxiosInstance,
) => {
  const { data } = await axiosInstance.post<IcashGenQRResponseSchema>(
    icashGenQRConfig.url,
    values,
  );
  return data;
};

export const icashGenQRCode = async (values: IcashGenQRSchema) => {
  const axiosInstance = createMerchantAxiosInstance(icashGenQRConfig);
  return await onGenQR(values, axiosInstance);
};

/**
 * @name ICASH AUTH server/merchant
 */
const onIcashAuth = async (
  values: IcashAuthSchema,
  axiosInstance: AxiosInstance,
) => {
  const response = await axiosInstance.post<IcashAuthResponseSchema>(
    icashAuthConfig.url,
    values,
  );
  return response;
};
export const icashAuth = async (values: IcashAuthSchema) => {
  const axiosInstance = createMerchantAxiosInstance(icashAuthConfig);
  return await onIcashAuth(values, axiosInstance);
};

/**
 * @name ICASH CREATE VIRTUAL ACCOUNT server/merchant
 */
const onCreateVA = async (
  values: IcashCreateVASchema,
  axiosInstance: AxiosInstance,
) => {
  const { data } = await axiosInstance.post<{
    data: IcashCreateVAResponseSchema;
  }>(icashCreateVAConfig.url, values);
  if (data?.data) {
    return data.data;
  }
  return data;
};
export const icashCreateVA = async (values: IcashCreateVASchema) => {
  const axiosInstance = createMerchantAxiosInstance(icashCreateVAConfig);
  return await onCreateVA(values, axiosInstance);
};

/**
 * @name ICASH GET VIRTUAL ACCOUNT server/merchant
 */
const onGetVA = async (id: IcashGetVASchema, axiosInstance: AxiosInstance) => {
  const { data } = await axiosInstance.get<{ data: IcashGetVAResponseSchema }>(
    `${icashGetVAConfig.url}${id}`,
  );
  return data;
};
export const icashGetVA = async (values: IcashGetVASchema) => {
  const axiosInstance = createMerchantAxiosInstance(icashGetVAConfig);
  return await onGetVA(values, axiosInstance);
};
