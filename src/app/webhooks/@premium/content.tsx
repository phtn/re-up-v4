"use client";

import { AuthContext } from "@src/app/context";
import { opts } from "@src/utils/helpers";
import { useCallback, useContext } from "react";
import { WebhookContent } from "../(components)/content";
import { WebhookDashboard } from "../dashboard";

/**
 * @name PremiumContent
 * @description This component is used to display authenticated content
 * @component With webhook account ? WebhookDashboard : WebhookContent
 */

export const PremiumContent = () => {
  const profile = useContext(AuthContext)?.profile;

  const WebhookViewOptions = useCallback(() => {
    const withWebhook = profile?.webhookCount !== 0;
    const options = opts(<WebhookDashboard />, <WebhookContent />);
    return <>{options.get(withWebhook)}</>;
  }, [profile?.webhookCount]);

  return <WebhookViewOptions />;
};
