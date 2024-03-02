import {
  HelpCircle,
  MoreVerticalIcon,
  PlusIcon,
  WebhookIcon,
} from "lucide-react";

import { Block, Flex } from "@@components/flex";
import { WebhookContext } from "../context";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { minifyve } from "@src/utils/helpers";
import { Touch } from "@@components/touch";
import { useContext, useEffect, useState } from "react";
import tw from "tailwind-styled-components";

export const WebhookPageNav = () => {
  const data = useContext(WebhookContext)?.webhooks as WebhookDataSchema[];
  const [webhook, setWebhook] = useState<WebhookDataSchema | undefined>();
  useEffect(() => {
    if (data) {
      setWebhook(data[0]);
    }
  }, [data]);

  if (!webhook) return;

  return (
    <NavWrap>
      <Flex>
        <div className="flex w-[72px] items-center justify-center">
          <WebhookIcon size={16} className="text-kindle" />
        </div>
        <Block className="items-start" spacing="space-y-[6px]">
          <h2 className="text-zap text-sm font-medium">
            {webhook.webhook.name}
          </h2>
          <p className="border-opus text-opus border-b-[0.33px] border-dashed font-mono text-[12px] tracking-wide">
            {minifyve(webhook.webhook.id)}
          </p>
        </Block>
      </Flex>
      <Flex spacing={`md:space-x-[64px] space-x-[16px]`}>
        <Block className="items-start">
          <h2 className="text-zap text-[12px] font-medium">Activity</h2>
          <p className="border-opus text-opus border-b-[0.33px] border-dashed font-mono text-xl tracking-wide">
            0
          </p>
        </Block>

        <Block className="items-start">
          <h2 className="text-zap text-xs font-medium">Endpoints</h2>
          <p className="border-opus text-opus border-b-[0.33px] border-dashed font-mono text-xl tracking-wide">
            {webhook.endpoints?.length ?? 0}
          </p>
        </Block>

        <Block className="items-start">
          <h2 className="text-zap text-xs font-medium">Events</h2>
          <p className="border-opus text-opus border-b-[0.33px] border-dashed font-mono text-xl tracking-wide">
            0
          </p>
        </Block>

        <Block className="items-start">
          <h2 className="text-zap text-[12px] font-medium">Logs</h2>
          <p className="border-opus text-opus border-b-[0.33px] border-dashed font-mono text-xl tracking-wide">
            0
          </p>
        </Block>
      </Flex>

      <Flex spacing={`space-x-[24px]`}>
        <p className="text-gray-700"> | </p>
      </Flex>
      <Flex spacing={`space-x-[24px]`}>
        <Touch
          size="sm"
          variant={"ghost"}
          iconClass={`h-[16px] w-[16px]`}
          icon={PlusIcon}
          className="text-cord bg-transparent text-[12px] font-medium"
        >
          Add Endpoint
        </Touch>
        <Flex spacing={`space-x-[24px]`}>
          <p className="text-gray-700"> | </p>
          <HelpCircle size={16} className="text-cord" />
        </Flex>
        <div className="flex w-[72px] items-center justify-center">
          <MoreVerticalIcon size={16} className="text-kindle" />
        </div>
      </Flex>
    </NavWrap>
  );
};

const NavWrap = tw.div`
  h-[72px] w-full bg-void flex items-center justify-between
`;
