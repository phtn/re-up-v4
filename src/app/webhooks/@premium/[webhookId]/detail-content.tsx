"use client";

import { type WebhookDataSchema } from "@@server/resource/webhook";
import { useContext, useEffect, useState, useCallback } from "react";
import { PageNavbar } from "../../(components)/page-nav";
import { WebhookContext } from "../../context";
import { EndpointCreate } from "./endpoint-create";
import ActivityCurve from "./curve";
import { Touch } from "@src/app/_components/touch";
import { Block } from "@src/app/_components/flex";
import { useRouter } from "next/navigation";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface EndpointItemInfo {
  createdAt?: string;
  name: string;
  uid: string;
  url?: string;
}

type EndpointItemProps = {
  router: AppRouterInstance;
  webhookId: string;
} & EndpointItemInfo;

type DetailContentProps = {
  webhookId: string;
};

interface EndpointsListProps {
  endpoints: EndpointItemInfo[];
}

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

  const EndpointsList: React.FC<EndpointsListProps> = ({ endpoints }) => {
    const router = useRouter();
    return (
      <>
        {endpoints.map((item: EndpointItemInfo) => (
          <div key={item.uid}>
            <EndpointItem webhookId={webhookId} router={router} {...item} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="h-[72px] w-full bg-void">
        <PageNavbar actions={actions} data={webhookInArray} />
      </div>

      <div className="h-full w-full">
        <div className="grid grid-cols-1 gap-[4px] md:grid-cols-3">
          <div className="col-span-1 overflow-scroll">
            <Activity id={webhook?.id ?? ""} />
          </div>
          <div className="col-span-1 py-6">
            {webhook?.endpoints && (
              <EndpointsList
                endpoints={webhook.endpoints as EndpointItemInfo[]}
              />
            )}
          </div>

          <div className="h-[428px] bg-void">
            <div>
              <EndpointCreate webhookId={webhookId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EndpointItem = (props: EndpointItemProps) => {
  const { name, router, uid, webhookId } = props;

  const navToEndpoint = useCallback(() => {
    router.push(`/webhooks/${webhookId}/${uid}`);
  }, [router, uid, webhookId]);

  return (
    <Block className="h-[72px] w-full">
      <Touch
        variant={"ghost"}
        className="w-[150px] bg-transparent"
        onClick={navToEndpoint}
      >
        {name}
      </Touch>
    </Block>
  );
};

type ActivityProps = {
  id: string;
};
const Activity = ({ id }: ActivityProps) => (
  <div className={id}>
    <div className="flex h-[428px] w-full flex-grow bg-darkmojo">
      <ActivityCurve width={500} height={440} />
    </div>
  </div>
);
