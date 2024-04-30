"use client";
import { useContext, useEffect, useState } from "react";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { DashboardNavbar } from "@src/app/webhooks/(components)/dash-nav";
import { WebhookContext } from "@src/app/webhooks/context";

type WebhookNavProps = {
  webhookId: string;
};

export const WebhookNav = ({ webhookId }: WebhookNavProps) => {
  const data = useContext(WebhookContext)?.webhooks as
    | WebhookDataSchema[]
    | null;
  const [webhook, setWebhook] = useState<WebhookDataSchema | null>(null);
  const [webhooks, setWebhooks] = useState<WebhookDataSchema[] | null>(null);

  useEffect(() => {
    if (data) {
      const webhookItem = data.filter((item) => item.id === webhookId);
      setWebhook(webhookItem[0]!);
      setWebhooks(webhookItem);
    }
  }, [webhookId, data, webhook]);

  const actions = {
    actionZero: () => 0,
  };
  return <DashboardNavbar actions={actions} data={webhooks} />;
};
