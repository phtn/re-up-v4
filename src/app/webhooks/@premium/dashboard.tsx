import { useContext, useEffect, useState } from "react";
import { PageNavbar } from "../(components)/page-nav";
import { DashboardContainer } from "../(components)/views";
import { WebhookContext } from "../context";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { useRouter } from "next/navigation";

export const WebhookDashboard = () => {
  const data = useContext(WebhookContext)?.webhooks as
    | WebhookDataSchema[]
    | null;
  const [webhooks, setWebhooks] = useState<WebhookDataSchema[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (data) {
      if (data.length === 1) {
        router.push(`/webhooks/${data[0]?.webhook.id}`);
      }
      setWebhooks(data);
      console.log(data.length);
    }
  }, [data, router]);

  return (
    <DashboardContainer>
      <PageNavbar data={webhooks} />
      <p>Webhook Dashboard</p>
    </DashboardContainer>
  );
};
