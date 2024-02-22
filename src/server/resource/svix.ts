import { z } from "zod";
import { type CSSProperties, type ReactNode } from "react";

export const AppPortalResource = z.object({
  app_id: z.string(),
  resource: z.object({
    featureFlags: z.array(z.string()),
    expiry: z.number().or(z.undefined()),
  }),
});

export type AppPortalSchema = z.infer<typeof AppPortalResource>;

export interface AppPortalProps {
  url: string | undefined | null;
  style?: CSSProperties;
  loadingIndicator?: ReactNode;
  darkMode?: boolean;
  fontFamily?: string;
  icon?: string;
  primaryColor?: string;
  fullSize?: boolean;
}
