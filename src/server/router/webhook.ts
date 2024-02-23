import { addWebhookDocument } from "../firebase/webhook";
import { addWebhookProcedure } from "../procedure/webhook";
import { router } from "../trpc";

export const webhookRouter = router({
  addWebhook: addWebhookProcedure.query(
    async ({ input }) => await addWebhookDocument(input),
  ),
});
