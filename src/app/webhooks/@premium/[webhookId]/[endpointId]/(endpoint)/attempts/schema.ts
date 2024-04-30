import {
  CheckCheckIcon,
  CircleAlertIcon,
  CircleCheckBigIcon,
  CircleXIcon,
  EqualNotIcon,
  ForwardIcon,
  MoreHorizontalIcon,
  OctagonXIcon,
  ReplyAllIcon,
  SearchXIcon,
  ShieldAlertIcon,
  TriangleAlertIcon,
} from "lucide-react";

export const statuses = [
  {
    value: "0",
    label: "Succeeded",
    icon: CheckCheckIcon,
  },
  {
    value: "1",
    label: "Pending",
    icon: MoreHorizontalIcon,
  },
  {
    value: "2",
    label: "Failed",
    icon: CircleXIcon,
  },
  {
    value: "3",
    label: "Sending",
    icon: MoreHorizontalIcon,
  },
];

export const codes = [
  {
    value: "200",
    label: "200 - OK",
    icon: CircleCheckBigIcon,
  },
  {
    value: "400",
    label: "400 - Bad Request",
    icon: CircleAlertIcon,
  },
  {
    value: "401",
    label: "401 - Unauthorized",
    icon: ShieldAlertIcon,
  },
  {
    value: "403",
    label: "403 - Forbidden",
    icon: OctagonXIcon,
  },
  {
    value: "404",
    label: "404 - Not Found",
    icon: SearchXIcon,
  },
  {
    value: "429",
    label: "429 - Too Many Requests",
    icon: ReplyAllIcon,
  },
  {
    value: "409",
    label: "409 - Conflict",
    icon: EqualNotIcon,
  },
  {
    value: "422",
    label: "422 - Unprocessable Entity",
    icon: TriangleAlertIcon,
  },
  {
    value: "308",
    label: "308 - Permanent Redirect",
    icon: ForwardIcon,
  },
  {
    value: "307",
    label: "307 - Temporary Redirect",
    icon: ForwardIcon,
  },
];

export const events = [
  {
    value: "payment.confirmation",
    label: "payment.confirmation",
  },
];
