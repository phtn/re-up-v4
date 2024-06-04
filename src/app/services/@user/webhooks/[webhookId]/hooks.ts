import { AuthContext } from "@src/app/(main)/context";
import type {
  CreateEndpointParamsSchema,
  CreateEndpointSchema,
  EndpointInfoSchema,
} from "@src/server/resource/endpoint";
import { type ListEventTypeResponseSchema } from "@src/server/resource/event-type";
import { type ListMessagesResponseSchema } from "@src/server/resource/message";
import {
  ValidInputFormat,
  type ValidInputFormatSchema,
} from "@src/server/resource/svix";
import { listEventTypes } from "@src/trpc/event-types/list";
import { listMessages } from "@src/trpc/message/list";
import { addEndpoint, createEndpoint } from "@src/trpc/svix/endpoint";
import { createEndpointUID } from "@src/utils/helpers";
import { Err } from "@src/utils/results";
import { onError, onSuccess, onValidationError } from "@src/utils/toast";
import { mergeObjects } from "@src/utils/transformers";
import { FileJsonIcon, Link2Icon, MessageSquareTextIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { EndpointIn, EndpointOut, EventTypeOut, MessageOut } from "svix";
import { type PopOptionsData } from "../(components)/pop-options";
import { type EndpointCreateState } from "./(types)/types";

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
            if (response) {
              setCreateState({ state: "Endpoint Created!", active: false });
              setLoading(false);
              onSuccess("New Endpoint created!");
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

type EndpointInterfaceParams = {
  webhookId: string | undefined;
  endpoints: EndpointInfoSchema[] | undefined;
};

export const useEndpointInterface = ({
  webhookId,
  endpoints,
}: EndpointInterfaceParams) => {
  const [eps, setEps] = useState<EndpointInfoSchema[]>(
    [] as EndpointInfoSchema[],
  );
  const router = useRouter();

  const navToEndpoint = useCallback(
    (uid: string) => () => {
      router.push(`/services/webhooks/${webhookId}/${uid}`);
    },
    [router, webhookId],
  );

  useEffect(() => {
    if (endpoints) {
      setEps(endpoints);
    }
  }, [endpoints]);

  const endpointData: PopOptionsData[] = useMemo(() => {
    return eps?.map(
      (endpoint: EndpointInfoSchema, index: number) =>
        ({
          id: index,
          type: "normal",
          action: navToEndpoint(endpoint.uid),
          title: endpoint.name.slice(0, 15),
          subtext: endpoint.uid.slice(0, 6),
          icon: Link2Icon,
          iconClass: "-rotate-45",
        }) as PopOptionsData,
    );
  }, [eps, navToEndpoint]);

  return { endpointData };
};

export const useEventTypeInterface = (webhookId: string | undefined) => {
  const [eventTypes, setEventTypes] = useState<EventTypeOut[]>(
    [] as EventTypeOut[],
  );

  const router = useRouter();

  const navToEventType = useCallback(
    (uid: string) => () => {
      router.push(`/services/webhooks/${webhookId}/${uid}`);
    },
    [router, webhookId],
  );

  useEffect(() => {
    const getEventTypes = async () => {
      return await listEventTypes();
    };
    getEventTypes()
      .then((response: string) => {
        if (response) {
          const result = JSON.parse(response) as ListEventTypeResponseSchema;
          setEventTypes(result.data);
        }
      })
      .catch(Err);
  }, []);

  const eventTypeData: PopOptionsData[] = useMemo(() => {
    return eventTypes?.map(
      (eventType: EventTypeOut, index: number) =>
        ({
          id: index,
          type: "normal",
          action: navToEventType(eventType.name),
          title: eventType.name.slice(0, 20),
          subtext: eventType.description.substring(
            0,
            eventType.description.indexOf("."),
          ),
          subtextClass:
            "text-cyan-600 tracking-wider uppercase border-cyan-600 border w-fit p-1 rounded-md",
          className: "w-full",
          icon: FileJsonIcon,
        }) as PopOptionsData,
    );
  }, [eventTypes, navToEventType]);

  return { eventTypeData };
};

export const useMessageInterface = (webhookId: string | undefined) => {
  const [messages, setMessages] = useState<MessageOut[]>([] as MessageOut[]);

  const router = useRouter();

  const navToMessage = useCallback(
    (uid: string) => () => {
      router.push(`/webhooks/${webhookId}/${uid}`);
    },
    [router, webhookId],
  );

  useEffect(() => {
    if (!webhookId) return;
    const getMessages = async () => {
      return await listMessages({ app_id: webhookId });
    };
    getMessages()
      .then((response: string) => {
        if (response) {
          const result = JSON.parse(response) as ListMessagesResponseSchema;
          setMessages(result.data);
        }
      })
      .catch(Err);
  }, [webhookId]);

  const messagesData: PopOptionsData[] = useMemo(() => {
    return messages?.map(
      (message: MessageOut, index: number) =>
        ({
          id: index,
          type: "normal",
          action: navToMessage(message.eventId ?? ""),
          extra: message?.eventType,
          extraClass:
            "text-cyan-700 py-0.5 px-2 rounded-md w-fit bg-cyan-400/10 border-cyan-600/40 border-[0.25px]",
          title: message.id.slice(-6),
          subtext: new Date(message.timestamp).toLocaleString(),
          subtextClass: "text-[10px] text-dyan",
          className: "xl:w-[450px] w-fit",
          icon: MessageSquareTextIcon,
        }) as PopOptionsData,
    );
  }, [messages, navToMessage]);

  return { messagesData };
};
