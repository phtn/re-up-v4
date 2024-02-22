import { svix } from "@src/lib/svix";
import { type AppPortalAccessIn } from "svix";

export const createAppPortalAccess = async (
  app_id: string,
  resource: AppPortalAccessIn,
) =>
  await svix.authentication.appPortalAccess(app_id, resource).then((res) => ({
    token: res.token,
    url: res.url,
  }));
