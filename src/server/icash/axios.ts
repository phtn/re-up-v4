import axios, { type AxiosRequestConfig } from "axios";

export const createCheckoutAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.ICASH_DEV}`,
        ...config?.headers,
      },
    },
    baseURL: "https://dev.i-cash.app:4443",
  });

export const createMerchantAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: "application/json",
        Authorization: `Basic ${process.env.ICASH_DEV}`,
        ...config?.headers,
      },
    },
    baseURL: "https://dev.i-cash.app:448",
  });

export const icashCheckoutConfig = {
  method: "POST",
  url: "/api/Merchant/checkout-url",
};

export const icashPayoutConfig = {
  method: "POST",
  url: "/api/payout/create",
};

export const icashAuthConfig = {
  method: "POST",
  url: "https://dev.i-cash.app:448/api/auth/login",
};

export const icashBankLookupConfig = {
  method: "GET",
  url: "/api/lookup/banks",
};

export const icashGenQRConfig = {
  method: "POST",
  url: "/api/merchant/generate-trans-qr",
};
