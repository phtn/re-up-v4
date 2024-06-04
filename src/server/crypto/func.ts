// const handleCrypto = () => {
//     getCryptoPrices(2803)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((e: Error) => console.log(e));
//   };

//   const handleFiat = () => {
//     getFiatMap()
//       .then((result: FiatMapResultSchema) => {
//         // const php = data?.find((item) => item.symbol === "PHP");
//         const php = result.data.find((fiat) => fiat.symbol === "PHP");
//         const eur = result.data.find((fiat) => fiat.symbol === "EUR");
//         const usd = result.data.find((fiat) => fiat.symbol === "USD");
//         const jpy = result.data.find((fiat) => fiat.symbol === "JPY");
//         console.log(php, eur, usd, jpy);

//       })
//       .catch((e: Error) => console.log(e));
//   };
