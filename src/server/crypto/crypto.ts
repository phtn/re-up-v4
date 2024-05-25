import { type AxiosInstance } from "axios";
import { createAxiosInstance, query } from "./axios";
import type { CMCIDSchema, ListingsResultSchema } from "../resource/cmc/crypto";

const onGetCryptoPrices = async (
  axiosInstance: AxiosInstance,
  id: CMCIDSchema,
) => {
  const { data } = await axiosInstance.get<ListingsResultSchema>(
    `https://pro-api.coinmarketcap.com${query.crypto_prices}=${id}`,
  );
  return data;
};

export const getCryptoPrices = async (id: CMCIDSchema) => {
  const axiosInstance = createAxiosInstance();
  return await onGetCryptoPrices(axiosInstance, id);
};
