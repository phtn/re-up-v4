import { HashIcon, PaintbrushIcon } from "lucide-react";
import { type Links } from "./types";

export const links: Links[] = [
  {
    title: "Color Converter",
    label: "Color-Converter",
    icon: PaintbrushIcon,
    variant: "default",
    href: "/tools/colors",
  },
  {
    title: "base64",
    label: "encoder",
    icon: HashIcon,
    variant: "default",
    href: "/tools/base64",
  },
];
