import { type LucideIcon } from "lucide-react";

export type Links = {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string
};

export interface NavProps {
  isCollapsed: boolean;
  links: Links[];
}
