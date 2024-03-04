import { ValidInputFormat } from "@src/server/resource/svix";
import { type WebhookPayloadSchema } from "@src/server/resource/webhook";
import { createAppPortalAccess } from "@src/trpc/svix/appPortal";
import { createWebhook } from "@src/trpc/svix/webhook";
import { addWebhookDocToFirebase } from "@src/trpc/webhook/add";
import { createWebhookUID } from "@src/utils/helpers";
import { Err } from "@src/utils/results";
import { onError, onSuccess, onValidationError } from "@src/utils/toast";
import { mergeObjects } from "@src/utils/transformers";
import { useEffect, useState } from "react";
import { type ApplicationIn } from "svix";

type CreateWebhookApp = {
  uid: string | undefined;
};
type SubmitStatus =
  | "Submit"
  | "Submitting"
  | "Submitted"
  | "Creating"
  | "Created";

type FormValues = {
  name: string;
};

/**
 * @name useCreateWebhookApp
 * @description Main hook that handles webhook creation
 * @location webhooks/hooks
 */
export const useCreateWebhookApp = ({ uid }: CreateWebhookApp) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("Submit");
  const [webhookName, setWebhookName] = useState<FormValues | null>(null);

  const checkObject = (input: ApplicationIn) => {
    const values = Object.values(input);
    const filtered = values.filter((val) => typeof val === "string");
    return filtered.length >= 2;
  };

  const getName = (data: FormValues) => {
    setWebhookName(data);
    setStatus("Submitting");
    setLoading(true);
  };

  useEffect(() => {
    const createWebhookInput = async () => {
      if (webhookName === null) return;
      if (!ValidInputFormat.safeParse(webhookName)) {
        onValidationError("*webhookName*");
        return;
      }

      const res = await createWebhookUID(
        uid,
        new Date().getTime().toString(36),
      );
      const newAppProps = { uid: res, rateLimit: 64 };

      const input: ApplicationIn = mergeObjects(webhookName, newAppProps);

      if (checkObject(input)) {
        const appResponse = await createWebhook(input);
        const portalResponse = await createAppPortal(appResponse.id);

        // TODO: Handle change of status

        const documentPayload: WebhookPayloadSchema = mergeObjects({
          webhook: appResponse,
          portal: portalResponse,
        });

        await addWebhookDocToFirebase({
          userId: uid,
          payload: documentPayload,
        })
          .then(() => {
            onSuccess("Webhook Successfully Created", `id: ${appResponse.id}`);
            setLoading(false);
          })
          .catch(Err);
      } else {
        onError("Error", "Invalid Input Data");
        setLoading(false);
      }
    };

    createWebhookInput()
      .then(() => setStatus("Creating"))
      .catch(Err);
  }, [webhookName, uid]);

  return { getName, loading, status };
};

const createAppPortal = async (app_id: string) =>
  await createAppPortalAccess({ id: app_id, resource: { featureFlags: [] } });
