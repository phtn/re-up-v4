import { useEffect, useState, useCallback } from "react";
import { type ApplicationIn } from "svix";
import { ValidInputFormat } from "@src/server/resource/svix";
import { onError, onSuccess, onValidationError } from "@src/utils/toast";
import { createWebhookUID } from "@src/utils/helpers";
import { mergeObjects } from "@src/utils/transformers";
import { createWebhook } from "@src/trpc/svix/webhook";
import { createAppPortalAccess } from "@src/trpc/svix/appPortal";
import { type WebhookPayloadSchema } from "@src/server/resource/webhook";
import { addWebhookDocToFirebase } from "@src/trpc/webhook/add";
import { Err } from "@src/utils/results";

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

// Use a custom hook to manage the state of the form
const useFormState = (initialState: SubmitStatus) => {
  const [status, setStatus] = useState(initialState);
  const [webhookName, setWebhookName] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(false);

  return {
    status,
    webhookName,
    loading,
    setStatus,
    setWebhookName,
    setLoading,
  };
};

// Main hook that handles webhook creation
export const useCreateWebhookApp = ({ uid }: CreateWebhookApp) => {
  const {
    status,
    webhookName,
    loading,
    setStatus,
    setWebhookName,
    setLoading,
  } = useFormState("Submit");

  // Moved the helper functions inside the main hook to avoid re-declaration on every render
  const checkObject = useCallback((input: ApplicationIn) => {
    const values = Object.values(input);
    const filtered = values.filter((val) => typeof val === "string");
    return filtered.length >= 2;
  }, []);

  const getName = useCallback(
    (data: FormValues) => {
      setWebhookName(data);
      setStatus("Submitting");
      setLoading(true);
    },
    [setWebhookName, setStatus, setLoading],
  );

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
  }, [webhookName, uid, setStatus, setLoading, checkObject]);

  return { getName, loading, status };
};
const createAppPortal = async (app_id: string) =>
  await createAppPortalAccess({ id: app_id, resource: { featureFlags: [] } });
