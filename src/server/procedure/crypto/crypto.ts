import { CMCID } from "@src/server/resource/cmc/crypto";
import { procedure } from "@src/server/trpc";

export const GetCryptoPricesProcedure = procedure.input(CMCID);
