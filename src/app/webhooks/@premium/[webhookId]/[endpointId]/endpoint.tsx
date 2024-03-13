"use client";

import { type WebhookDataSchema } from "@@server/resource/webhook";
import { useContext, useEffect, useState } from "react";
import { PageNavbar } from "../../../(components)/page-nav";
import { WebhookContext } from "../../../context";
import { type EndpointItemInfo } from "../detail-content";
import { usePathname } from "next/navigation";

type DetailContentProps = {
  endpointId: string;
};

export const DetailContent = ({ endpointId }: DetailContentProps) => {
  const data = useContext(WebhookContext)?.webhooks as
    | WebhookDataSchema[]
    | null;
  const [webhook, setWebhook] = useState<WebhookDataSchema | null>(null);
  const [endpoints, setEndpoints] = useState<EndpointItemInfo[] | undefined>();
  const [webhookInArray, setWebhookInArray] = useState<
    WebhookDataSchema[] | null
  >(null);

  const pathName = usePathname();

  useEffect(() => {
    if (data) {
      const webhookItem = data.filter((item) => item.id === endpointId);
      setWebhook(webhookItem[0]!);
      setWebhookInArray(webhookItem);
      if (webhook) {
        setEndpoints(webhook.endpoints as EndpointItemInfo[]);
        if (endpoints) {
          console.log(endpoints[0] ?? null);
        }
      }
    }
  }, [data, endpointId, webhook, endpoints]);

  const actions = {
    actionZero: () => 0,
  };

  return (
    <div>
      <div className="h-[72px] w-full bg-void">
        <PageNavbar actions={actions} data={webhookInArray} />
      </div>

      <div className="h-full w-full">
        <div className="grid grid-cols-1 gap-[4px] md:grid-cols-3">
          <div className="flex items-center p-5 font-jet text-xs font-thin">
            code: {pathName.slice(-2)}
          </div>
          <div className="p-5 font-jet text-xs font-thin">event: -a</div>
          <div className="p-5 font-jet text-xs font-thin">env: dev</div>
        </div>
      </div>
    </div>
  );
};
