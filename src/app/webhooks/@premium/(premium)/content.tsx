"use client";

import { opts } from "@@utils/helpers";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAccountInfo } from "@src/app/account/hooks";
import { ServicesDashboard } from "./services";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { WebhookContext } from "../../context";
import { WebhookLanding } from "../../(components)/landing-page";
import { Loader } from "../../(components)/loader";

/**
 * @name PremiumContent
 * @description This component is used to display authenticated content
 * @component With webhook account ? WebhookDashboard : WebhookContent
 */
export const PremiumContent = () => {
  const { profile, loading } = useAccountInfo();
  const data = useContext(WebhookContext)?.webhooks as
    | WebhookDataSchema[]
    | null;
  const [webhook, setWebhook] = useState<WebhookDataSchema | null>(null);

  useEffect(() => {
    if (!!data && data.length > 0) {
      setWebhook(data[0]!);
    }
  }, [data]);

  const WebhookViewOptions = useCallback(() => {
    if (!profile) return <WebhookLanding />;
    const withWebhook = !!profile.webhookCount;
    const options = opts(
      <ServicesDashboard profile={profile} webhookId={webhook?.webhook?.id} />,
      <WebhookLanding />,
    );
    return <>{options.get(withWebhook)}</>;
  }, [profile, webhook?.webhook?.id]);

  if (loading) return <Loader />;

  return <WebhookViewOptions />;
};
