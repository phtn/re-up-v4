import { WebhookContext } from "@src/app/webhooks/context";
import type {
  EndpointInfoSchema,
  GetEndpointResponseSchema,
  GetEndpointSchema,
} from "@src/server/resource/endpoint";
import type {
  ListMessagesByEndpointResponseSchema,
  ListMessagesByEndpointSchema,
} from "@src/server/resource/message";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { getEndpoint } from "@src/trpc/endpoint/get";
import { listMessageAttempts } from "@src/trpc/message/list";
import { copyFn } from "@src/utils/helpers";
import { Err } from "@src/utils/results";
import { useCallback, useContext, useEffect, useState } from "react";
import type { MessageAttemptOut } from "svix";

export const useEndpointInterface = ({
  app_id,
  endpoint_id,
}: GetEndpointSchema) => {
  const [endpoint, setEndpoint] = useState<GetEndpointResponseSchema | null>(
    null,
  );

  useEffect(() => {
    if (!app_id && !endpoint_id) return;

    const getEndpointInfo = async () =>
      await getEndpoint({ app_id, endpoint_id });

    getEndpointInfo()
      .then((response) => {
        if (response) {
          setEndpoint(response as GetEndpointResponseSchema);
          console.log(response);
        }
      })
      .catch(Err);
  }, [app_id, endpoint_id]);

  return { endpoint };
};

export const useMessageAttempInterface = ({
  app_id,
  endpoint_id,
}: ListMessagesByEndpointSchema) => {
  const [attempts, setAttempts] = useState<MessageAttemptOut[]>(
    [] as MessageAttemptOut[],
  );

  useEffect(() => {
    if (!app_id && !endpoint_id) return;
    const getMessageAttempts = async () =>
      await listMessageAttempts({ app_id, endpoint_id });

    getMessageAttempts()
      .then((response: string) => {
        if (response) {
          const result = JSON.parse(
            response,
          ) as ListMessagesByEndpointResponseSchema;
          console.log(result.data);
          setAttempts(result.data);
        }
      })
      .catch(Err);
  }, [app_id, endpoint_id]);

  return { attempts };
};

export const useActiveControls = () => {
  const copy =
    (...args: Array<string | undefined>) =>
    async () => {
      await copyFn({ specie: args[0], text: args[1] });
    };

  return { copy };
};

type FirebaseWebhookParams = {
  app_id?: string | undefined;
  endpoint_id?: string | undefined;
  event_id?: string | undefined;
  message_id?: string | undefined;
};
export const useFirebaseWebhook = ({ app_id }: FirebaseWebhookParams) => {
  const [allWebhooks, setWebhooks] = useState<WebhookDataSchema[] | null>(null);

  const data = useContext(WebhookContext)?.webhooks as
    | WebhookDataSchema[]
    | null;

  useEffect(() => {
    if (!!data && data.length > 0) {
      setWebhooks(data);
    }
  }, [data]);

  const getWebhookById = useCallback(
    (id: string | undefined) => {
      return allWebhooks?.find((webhook) => webhook.id === id);
    },
    [allWebhooks],
  );

  const [defaultWebhook, setDefault] = useState<
    WebhookDataSchema | undefined
  >();
  const [allEndpoints, setEndpoints] = useState<
    EndpointInfoSchema[] | undefined
  >();

  const getEndpointById = useCallback(
    (id: string | undefined) => {
      return allEndpoints?.find((endpoint) => endpoint.uid === id);
    },
    [allEndpoints],
  );

  useEffect(() => {
    const getDefaultWebhook = (): WebhookDataSchema | undefined => {
      return allWebhooks?.find((webhook) => webhook.id === app_id);
    };
    const webhook = getDefaultWebhook();
    setDefault(webhook);
    setEndpoints(webhook?.endpoints);
  }, [app_id, allWebhooks]);

  return { allWebhooks, defaultWebhook, getWebhookById, getEndpointById };
};
