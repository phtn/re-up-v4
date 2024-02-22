import { createAppPortalProcedure } from "../procedure/svix";
import { createAppPortalAccess } from "../svix/appPortal";
import { router } from "../trpc";

export const svixRouter = router({
  createAppPortal: createAppPortalProcedure.query(async ({ input }) => {
    return await createAppPortalAccess(input.app_id, input.resource).then(
      (res) => res,
    );
  }),
});
