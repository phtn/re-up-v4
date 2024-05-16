import { getCryptoPrices } from "../crypto/crypto";
import { procedure, router } from "../trpc";

export const cryptoRouter = router({
  getCryptoPrices: procedure.query(
    async () => await getCryptoPrices().then((res) => res),
  ),
});
