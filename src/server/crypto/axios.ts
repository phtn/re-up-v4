import axios from "axios";

export const createAxiosInstance = () =>
  axios.create({
    headers: {
      "X-CMC_PRO_API_KEY": `${process.env.COINMARKETCAP}`,
    },
    baseURL: `https://pro-api.coinmarketcap.com`,
    method: "GET",
  });

export const query = {
  quotes: "/v1/cryptocurrency/quotes/latest",
  listings:
    "/v1/cryptocurrency/listings/latest?convert_id=1&2781&convert_id=1,2803",
  fiat: "/v1/fiat/map",
  crypto_prices: "/v1/cryptocurrency/listings/latest?convert_id",
  // crypto_php: "/v1/cryptocurrency/listings/latest?convert_id=2803",
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
