import { AddEndpointParams, CreateEndpointParams } from "../resource/endpoint";
import { procedure } from "../trpc";

export const createEndpointProcedure = procedure.input(CreateEndpointParams);
export const addEndpointProcedure = procedure.input(AddEndpointParams);
