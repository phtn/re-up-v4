import { type Group } from "@src/app/(ui)/sidenav";
import {
  CogIcon,
  ListTreeIcon,
  ShoppingBagIcon,
  Users2Icon,
} from "lucide-react";

export const navlist: Group[] = [
  {
    label: "Payments & Invoicing",
    values: [
      {
        label: "Invoices",
        desc: "View all invoices",
        value: "0",
        icon: ListTreeIcon,
        href: "/services/payments/invoices",
      },
      {
        label: "Customers",
        desc: "View customer list",
        value: "1",
        icon: Users2Icon,
        href: "/services/payments/customers",
      },
      {
        label: "Products",
        desc: "View all products",
        value: "2",
        icon: ShoppingBagIcon,
        href: "/services/payments/products",
      },
      {
        label: "Payouts",
        desc: "View list of payouts",
        value: "3",
        icon: CogIcon,
        href: "/services/payments/payouts",
      },
    ],
  },
];
