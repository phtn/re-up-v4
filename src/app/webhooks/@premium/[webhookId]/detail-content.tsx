"use client";

import { type WebhookDataSchema } from "@@server/resource/webhook";
import { useContext, useEffect, useState } from "react";
import { PageNavbar } from "../../(components)/page-nav";
import { WebhookContext } from "../../context";
import { EndpointCreate } from "./endpoint-create";
import ActivityCurve from "./curve";

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

  const actions = {
    actionZero: () => 0,
  };

  return (
    <div>
      <div className="bg-void h-[72px] w-full">
        <PageNavbar actions={actions} data={webhookInArray} />
      </div>

      <div className="h-full w-full">
        <div className="grid grid-cols-1 gap-[4px] md:grid-cols-3">
          <div className="col-span-2">
            <Activity id={webhook?.id ?? ""} />
          </div>

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

type ActivityProps = {
  id: string;
};
const Activity = ({ id }: ActivityProps) => (
  <div className={id}>
    <div className="bg-darkmojo flex h-[428px] w-full flex-grow">
      <ActivityCurve width={880} height={440} />
    </div>
  </div>
);
