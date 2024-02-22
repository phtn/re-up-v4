import { AppPortalResource } from "../resource/svix";
import { procedure } from "../trpc";

export const createAppPortalProcedure = procedure.input(AppPortalResource);
