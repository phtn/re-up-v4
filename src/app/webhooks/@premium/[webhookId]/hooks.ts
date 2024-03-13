import { AuthContext } from "@src/app/context";
import type {
  CreateEndpointParamsSchema,
  CreateEndpointSchema,
} from "@src/server/resource/endpoint";
import {
  ValidInputFormat,
  type ValidInputFormatSchema,
} from "@src/server/resource/svix";
import { addEndpoint, createEndpoint } from "@src/trpc/svix/endpoint";
import { createEndpointUID } from "@src/utils/helpers";
import { onError, onSuccess, onValidationError } from "@src/utils/toast";
import { mergeObjects } from "@src/utils/transformers";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import type { EndpointIn, EndpointOut } from "svix";
import { type EndpointCreateState } from "./types";

export type GetEndpointInfo = {
  name: ValidInputFormatSchema;
  description: ValidInputFormatSchema;
  webhookId: string;
};

/**
 * @name useWebhookInterface
 * @location webhooks/\@premium/hooks.ts
 */
export const useWebhookInterface = () => {
  const [loading, setLoading] = useState(false);
  const [createState, setCreateState] = useState<EndpointCreateState>({
    state: "Create Endpoint",
    active: true,
  });
  const [endpointFormValues, setEndpointFormValues] =
    useState<GetEndpointInfo>();
  const [endpointPayload, setEndpointPayload] =
    useState<CreateEndpointSchema>();

  const userId = useContext(AuthContext)?.user?.uid;
  const pathName = usePathname();

  const getEndpointInfo = useCallback((formValues: GetEndpointInfo) => {
    setEndpointFormValues(formValues);
  }, []);

  useEffect(() => {
    if (endpointFormValues) {
      setLoading(true);
      createEndpointUID(userId, new Date().getTime().toString(36))
        .then((uid) => {
          const defaults = {
            rateLimit: 64,
            disabled: false,
            // filterTypes: undefined,
            // channels: undefined,
            metadata: {},
          };
          const url = `https://re-up.ph${pathName}/${uid}`;
          const payload: CreateEndpointSchema = mergeObjects({
            description: endpointFormValues?.description,
            url,
            uid,
            ...defaults,
          });

          setEndpointPayload(payload);
          setCreateState({ state: "Creating ...", active: false });
        })
        .catch((err: Error) => {
          onError("Error creating endpoint", err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId, pathName, endpointFormValues]);

  const handleCreateEndpoint = useCallback(
    async (params: CreateEndpointParamsSchema) => {
      try {
        const payload = await createEndpoint(params);
        if (
          endpointFormValues?.name &&
          userId &&
          endpointFormValues?.webhookId &&
          payload &&
          (payload satisfies EndpointOut)
        ) {
          const postParams = {
            name: endpointFormValues?.name,
            app_id: endpointFormValues?.webhookId,
            userId,
            payload,
          };

          /**
           * @name addEndpoint
           * @description Add a new endpoint to the database
           */
          console.log("postParams", postParams);
          return await addEndpoint(postParams).then((response) => {
            const [message, statusCode] = response;
            if (response && statusCode === 1) {
              setCreateState({ state: "Endpoint Created!", active: false });
              setLoading(false);
              onSuccess("New Endpoint created!", `server : ${String(message)}`);
            } else {
              setCreateState({ state: "Create Endpoint", active: true });
              setLoading(false);
              onError("Unable to create endpoint", "Please try again later.");
            }
          });
        }
      } catch (_err) {
        setLoading(false);
        onError(
          "An error occurred while creating endpoint",
          "Please try again later.",
        );
      }
    },
    [endpointFormValues, userId],
  );

  useEffect(() => {
    const createAndHandleEndpoint = async () => {
      if (endpointPayload && (endpointPayload satisfies EndpointIn)) {
        setLoading(true);
        const validInput = ValidInputFormat.safeParse(
          endpointPayload.description,
        );
        if (!validInput.success) {
          onValidationError("*name or description*");
          setCreateState({ state: "Create Endpoint", active: true });
        } else if (endpointPayload satisfies CreateEndpointSchema) {
          if (endpointFormValues?.webhookId) {
            await handleCreateEndpoint({
              app_id: endpointFormValues.webhookId,
              resource: endpointPayload,
            });
          } else {
            // Handle the case where webhookId is undefined
            // This could be showing an error message, or setting a default value
          }
        }
        setLoading(false);
      }
    };

    createAndHandleEndpoint().then().catch(onError);
  }, [endpointPayload, endpointFormValues, handleCreateEndpoint]);

  return { getEndpointInfo, loading, createState };
};
