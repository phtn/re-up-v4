"use client";

import { opts } from "@src/utils/helpers";
import { useCallback } from "react";
import { WebhookLanding } from "../(components)/landing-page";
import { WebhookDashboard } from "./dashboard";
import { useAccountInfo } from "@src/app/account/hooks";

/**
 * @name PremiumContent
 * @description This component is used to display authenticated content
 * @component With webhook account ? WebhookDashboard : WebhookContent
 */
export const PremiumContent = () => {
  const { profile } = useAccountInfo();

  const WebhookViewOptions = useCallback(() => {
    if (!profile) return <WebhookLanding />;
    const withWebhook = !!profile.webhookCount;
    const options = opts(<WebhookDashboard />, <WebhookLanding />);
    return <>{options.get(withWebhook)}</>;
  }, [profile]);

  return <WebhookViewOptions />;
};
