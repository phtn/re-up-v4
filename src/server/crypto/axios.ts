import axios, { type AxiosRequestConfig } from "axios";

export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "deflate, gzip",
      "X-CMC_PRO_API_KEY": `${process.env.COINMARKETCAP}`,
    },
    baseURL: "https://sandbox-api.coinmarketcap.com/v1",
  });

export const cryptoConfig = {
  url: "/cryptocurrency/listings/latest",
};

// let response = null;
// new Promise(async (resolve, reject) => {
//   try {
//     response = await axios.get('/cryptocurrency/listings/latest', {
//       headers: {
//         'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
//       },
//     });
//   } catch(ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
//   }
//   if (response) {
//     // success
//     const json = response.data;
//     console.log(json);
//     resolve(json);
//   }
// });

/**
curl -H "X-CMC_PRO_API_KEY: 36f5c223-d8cd-45bb-926a-9205bf014ec0" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
*/
