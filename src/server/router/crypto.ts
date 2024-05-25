import { getCryptoPrices } from "../crypto/crypto";
import { getFiatMap } from "../crypto/fiat";
import { GetCryptoPricesProcedure } from "../procedure/crypto/crypto";
import { procedure, router } from "../trpc";

export const cryptoRouter = router({
  getCryptoPrices: GetCryptoPricesProcedure.query(
    async ({ input }) => await getCryptoPrices(input).then((res) => res),
  ),
  getFiatMap: procedure.query(
    async () => await getFiatMap().then((res) => res),
  ),
});
