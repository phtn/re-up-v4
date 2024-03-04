import { HelpCircle, PlusIcon, WebhookIcon } from "lucide-react";

import { Block, Flex } from "@@components/flex";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { minifyve, opts } from "@src/utils/helpers";
import { Touch } from "@@components/touch";
import { useEffect, useState, useCallback } from "react";
import tw from "tailwind-styled-components";
import { Navbar } from "./navbar";
import { MoreOptions } from "./more-options";

type PageNavbarProps = {
  data: WebhookDataSchema[] | undefined | null;
  actions: Record<string, () => void>;
};

export const PageNavbar = ({ data, actions }: PageNavbarProps) => {
  const [webhook, setWebhook] = useState<WebhookDataSchema | undefined>();
  const [webhookCount, setWebhookCount] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setWebhookCount(data.length);
      setWebhook(data[0]);
    }
  }, [data]);

  const TitleOptions = useCallback(() => {
    const overOne = !!webhookCount && webhookCount < 1;
    const options = opts(
      <PrimaryItem label="Webhooks" value={webhookCount} />,
      <SecondaryItem
        label={webhook?.webhook.name}
        value={minifyve(webhook?.webhook.id)}
      />,
    );
    return <>{options.get(overOne)}</>;
  }, [webhook, webhookCount]);

  const { createEnpoint } = actions;
  const handleCreateEndpoint = () => {
    if (createEnpoint) {
      createEnpoint();
    }
  };

  if (!webhook) return;

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Icon>
          <WebhookIcon size={24} className="text-kindle" />
        </Navbar.Icon>
        <TitleOptions />
      </Navbar.Header>

      <Navbar.Items>
        <Block className="items-start">
          <h2 className="text-zap text-[12px] font-medium">Activity</h2>
          <p className="border-opus text-opus border-b-[0.33px] border-dashed font-mono text-xl tracking-wide">
            0
          </p>
        </Block>

        <Block className="items-start" spacing="space-y-[2px]">
          <h2 className="text-opus text-xs font-medium">Endpoints</h2>
          <p className="border-opus text-zap border-b-[0.33px] border-dashed font-mono text-xl font-thin tracking-wide">
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
      </Navbar.Items>

      <Navbar.Extras>
        <Touch
          size="sm"
          variant={"ghost"}
          iconClass={`h-[16px] w-[16px]`}
          icon={PlusIcon}
          className="text-cord bg-transparent text-[12px] font-medium"
          onClick={handleCreateEndpoint}
        >
          Endpoint
        </Touch>
        <Flex spacing={`space-x-[24px]`}>
          <p className="text-gray-700"> | </p>
          <HelpCircle size={16} className="text-cord" />
        </Flex>
        <Navbar.Icon>
          <MoreOptions />
        </Navbar.Icon>
      </Navbar.Extras>
    </Navbar>
  );
};

type ItemProps = {
  label: string | undefined;
  value: string | number | undefined;
};
const PrimaryItem = ({ label, value }: ItemProps) => (
  <Navbar.Title>
    <ItemTitle>{label ?? ""}</ItemTitle>
    <ItemCount>{value ?? ""}</ItemCount>
  </Navbar.Title>
);
const SecondaryItem = ({ label, value }: ItemProps) => (
  <Navbar.Title>
    <ItemTitle>{label ?? ""}</ItemTitle>
    <ItemSubtext>{value ?? ""}</ItemSubtext>
  </Navbar.Title>
);

const ItemTitle = tw.h2`
 text-zap font-medium
`;
const ItemSubtext = tw.p`
  border-opus text-opus border-b-[0.33px] border-dashed font-mono font-light text-[12px] tracking-wide
`;
const ItemCount = tw.p`
  border-opus text-opus border-b-[0.33px] border-dashed font-mono text-xl tracking-wide
`;
