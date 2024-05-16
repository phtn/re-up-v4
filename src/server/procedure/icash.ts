import {
  IcashCheckoutResource,
  IcashCreateVAResource,
  IcashGetVAResource,
  IcashGenQRResource,
  IcashAuthResource,
} from "../resource/icash";
import { procedure } from "../trpc";

export const icashCheckoutProcedure = procedure.input(IcashCheckoutResource);
export const icashAuthProcedure = procedure.input(IcashAuthResource);
export const icashGenQRProcedure = procedure.input(IcashGenQRResource);
export const icashCreateVAProcedure = procedure.input(IcashCreateVAResource);
export const icashGetVAProcedure = procedure.input(IcashGetVAResource);
