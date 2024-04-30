import {
  ListMessagesResource,
  ListMessagesByEndpointResource,
} from "../resource/message";
import { procedure } from "../trpc";

export const listMsgProcedure = procedure.input(ListMessagesResource);

export const listMsgAttemptProcedure = procedure.input(
  ListMessagesByEndpointResource,
);
