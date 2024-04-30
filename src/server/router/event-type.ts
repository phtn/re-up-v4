import { getEventTypes } from "../svix/event-type";
import { procedure, router } from "../trpc";

export const eventTypeRouter = router({
  getEventTypes: procedure.query(
    async () => await getEventTypes().then((res) => res),
  ),
});
