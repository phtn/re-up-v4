"use client";

import { useContext, useEffect, useState } from "react";
import { WebhookContext } from "../../context";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { PageNavbar } from "../../(components)/page-nav";
import { useWebhookInterface } from "./hooks";
import { Block } from "@src/app/_components/flex";

type DetailContentProps = {
  webhookId: string;
};
export const DetailContent = ({ webhookId }: DetailContentProps) => {
  const data = useContext(WebhookContext)?.webhooks as
    | WebhookDataSchema[]
    | null;
  const [webhook, setWebhook] = useState<WebhookDataSchema | null>(null);
  const [webhookInArray, setWebhookInArray] = useState<
    WebhookDataSchema[] | null
  >(null);

  useEffect(() => {
    if (data) {
      const webhookItem = data.filter((item) => item.id === webhookId);
      setWebhook(webhookItem[0]!);
      setWebhookInArray(webhookItem);
    }
  }, [data, webhookId]);

  const { handleCreateEndpoint } = useWebhookInterface();
  const actions = {
    createEndpoint: handleCreateEndpoint,
  };

  return (
    <div>
      <PageNavbar actions={actions} data={webhookInArray} />

      <Block>
        <h1>{webhook?.id}</h1>
        <p onClick={() => handleCreateEndpoint()} className="text-void">
          {webhook?.webhook.name}
        </p>
      </Block>
    </div>
  );
};
