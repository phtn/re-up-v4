import { type AxiosInstance } from "axios";
import { createAxiosInstance, query } from "./axios";
import { type FiatMapResultSchema } from "../resource/cmc/fiat";

const onGet = async (axiosInstance: AxiosInstance) => {
  const { data } = await axiosInstance.get<FiatMapResultSchema>(
    `https://pro-api.coinmarketcap.com${query.fiat}`,
  );
  return data;
};

export const getFiatMap = async () => {
  const axiosInstance = createAxiosInstance();
  return await onGet(axiosInstance);
};
