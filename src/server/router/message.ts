import {
  listMsgAttemptProcedure,
  listMsgProcedure,
} from "../procedure/message";
import { listMessageAttemptsByEndpoint, listMessages } from "../svix/message";
import { router } from "../trpc";

export const messageRouter = router({
  listMessages: listMsgProcedure.query(
    async ({ input }) => await listMessages(input).then((res) => res),
  ),
  listMessageAttemptsByEndpoint: listMsgAttemptProcedure.query(
    async ({ input }) =>
      await listMessageAttemptsByEndpoint(input).then((res) => res),
  ),
});
