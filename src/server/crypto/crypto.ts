import { type AxiosInstance } from "axios";
import { createAxiosInstance, cryptoConfig as config } from "./axios";

const onGetCryptoPrices = async (axiosInstance: AxiosInstance) => {
  return await axiosInstance.get("/cryptocurrency/listings/latest");
};

export const getCryptoPrices = async () => {
  const axiosInstance = createAxiosInstance(config);
  return await onGetCryptoPrices(axiosInstance);
};
