import {
  ValidInputFormat,
  type CreateEndpointSchema,
} from "@src/server/resource/svix";
import { createEndpoint } from "@src/trpc/svix/webhook";
import { onValidationError } from "@src/utils/toast";
import { type EndpointIn } from "svix";

export type UseWebhookInterface = {
  appId: string;
  uid: string;
};

/**
 * @name useWebhookInterface
 * @param appId - Webhook app id
 * @param uid - userId
 */
export const useWebhookInterface = () => {
  // const [loading, setLoading] = useState(false);

  const endpointIn: CreateEndpointSchema = {
    description: "An example endpoint name. *",
    rateLimit: 250,
    uid: "unique-ep-identifier",
    url: "https://example.com/webhook/",
    disabled: false,
    filterTypes: ["user.signup", "user.deleted"],
    channels: ["project_123", "group_2"],
    metadata: {},
  } satisfies EndpointIn;

  const isAlphanumericWithSymbols = (value: string) => {
    return /^[a-zA-Z0-9\-_. ]+$/.test(value);
  };

  const handleCreateEndpoint = async () => {
    const isValid = ValidInputFormat.safeParse(endpointIn.description);
    if (isValid.success) {
      const response = await createEndpoint(endpointIn);
      console.log(response, isAlphanumericWithSymbols(endpointIn.description));
      return;
    }
    console.log(isValid.error.message);
    onValidationError("*description*");
  };

  return { handleCreateEndpoint };
};
