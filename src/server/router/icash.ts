// import { icashCreateCheckout } from "../icash/icash";
import {
  icashAuth,
  icashCreateVA,
  icashGetVA,
  icashGenQRCode,
} from "../icash/merchant";
import {
  icashAuthProcedure,
  icashCreateVAProcedure,
  icashGetVAProcedure,
  icashCheckoutProcedure,
  icashGenQRProcedure,
} from "../procedure/icash";
import { router } from "../trpc";

export const icashRouter = router({
  icashCreateCheckout: icashCheckoutProcedure.query(async ({ input }) => {
    // return await icashCreateCheckout(input).then((res) => {
    //   const data = res.data[0];
    //   const status = res.status;
    //   return { data, status };
    // });
    return input;
  }),
});

export const merchantRouter = router({
  icashAuth: icashAuthProcedure.query(
    async ({ input }) => await icashAuth(input).then((res) => res),
  ),
  icashCreateVA: icashCreateVAProcedure.query(
    async ({ input }) => await icashCreateVA(input).then((res) => res),
  ),
  icashGenQRCode: icashGenQRProcedure.query(
    async ({ input }) => await icashGenQRCode(input).then((res) => res),
  ),
  icashGetVA: icashGetVAProcedure.query(
    async ({ input }) => await icashGetVA(input).then((res) => res),
  ),
});
