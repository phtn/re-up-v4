import { type AxiosInstance } from "axios";
import { createAxiosInstance, cryptoConfig as config } from "./axios";

const onGetCryptoPrices = async (axiosInstance: AxiosInstance) => {
  return await axiosInstance.get(config.url);
};

export const getCryptoPrices = async () => {
  const axiosInstance = createAxiosInstance();
  return await onGetCryptoPrices(axiosInstance);
};
