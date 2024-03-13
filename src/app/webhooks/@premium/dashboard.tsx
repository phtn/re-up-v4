import { type WebhookDataSchema } from "@@server/resource/webhook";
import { Disc3Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PageNavbar } from "../(components)/page-nav";
import { DashboardContainer } from "../(components)/views";
import { WebhookContext } from "../context";

/**
 * @name WebhookDashboard 
 * @location webhooks/\@premium/dashboard.tsx
 */
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

  const actions = {
    delete: () => console.log("delete"),
  };

  return (
    <DashboardContainer>
      <div className="h-[72px] w-full">
        <PageNavbar actions={actions} data={webhooks} />
      </div>
      <div className="flex h-[428px] w-full items-center justify-center space-x-4">
        <p className="text-opus text-xs">Loading...</p>
        <Disc3Icon size={16} className="text-opus animate-spin" />
      </div>
    </DashboardContainer>
  );
};
