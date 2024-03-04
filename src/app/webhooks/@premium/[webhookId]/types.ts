import { type IconName } from "@src/app/_components/input";
import { type LucideIcon } from "lucide-react";

export type EndpointCreateProps = {
  webhookId: string;
};

export type EndpointField = {
  name: "name" | "description";
  alt: IconName;
  placeholder: string;
  type: string;
  icon: LucideIcon;
};

export type EndpointCreateState =
  | { state: "Create Endpoint"; active: boolean }
  | { state: "Creating ..."; active: boolean }
  | { state: "Provisioning ..."; active: boolean }
  | { state: "Endpoint Created!"; active: boolean };
