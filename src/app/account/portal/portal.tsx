"use client";

import { AppPortal } from "svix-react";
import "svix-react/style.css";

export const Portal = ({ url }: { url: string }) => {
  return <AppPortal url={url} />;
};
