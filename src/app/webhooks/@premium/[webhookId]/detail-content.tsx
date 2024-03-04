"use client";

import { useContext, useEffect, useState } from "react";
import { WebhookContext } from "../../context";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { PageNavbar } from "../../(components)/page-nav";
import { useWebhookInterface } from "./hooks";
import { EndpointCreate } from "./endpoint-create";

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

  const { getEndpointInfo } = useWebhookInterface();
  const handleCreateEndpoint = () => {
    getEndpointInfo({
      name: "endpoint-one",
      description: "endpoint-desc",
      webhookId,
    });
  };

  const actions = {
    createEndpoint: handleCreateEndpoint,
  };

  return (
    <div>
      <div className="h-[72px] w-full">
        <PageNavbar actions={actions} data={webhookInArray} />
      </div>

      <div className="h-[428px] w-full">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2">stats {webhook?.id}</div>
          <div className="bg-void h-[428px]">
            <div>
              <EndpointCreate webhookId={webhookId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
