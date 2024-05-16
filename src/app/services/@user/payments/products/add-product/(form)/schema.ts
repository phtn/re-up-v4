import {
  type LucideIcon,
  ScanBarcodeIcon,
  SquareGanttChartIcon,
  RulerIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { z } from "zod";
import { getUnitAmount } from "../../../(hooks)/helpers";
import { type AddProductSchema } from "@src/server/resource/copperx/product";

export interface ProductField {
  name:
    | "name"
    | "description"
    | "isActive"
    | "unitLabel"
    | "url"
    | "type"
    | "currency"
    | "unitAmount";
  alt: string;
  icon?: LucideIcon;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  disabled: boolean;
}

export const productFields: ProductField[] = [
  {
    name: "name",
    alt: "name",
    placeholder: "",
    label: "Product name@required",
    type: "text",
    icon: ScanBarcodeIcon,
    disabled: false,
  },
  {
    name: "description",
    alt: "description",
    placeholder: "",
    label: "Brief description",
    type: "text",
    icon: SquareGanttChartIcon,
    disabled: false,
  },
  {
    name: "isActive",
    alt: "Product Status",
    placeholder: "",
    label: "Product Status",
    type: "text",
    disabled: false,
  },
  {
    name: "unitLabel",
    alt: "unitLabel",
    placeholder: "",
    label: "Unit label",
    type: "text",
    icon: RulerIcon,
    disabled: false,
  },
  {
    name: "url",
    alt: "url",
    placeholder: "",
    label: "Product URL",
    type: "text",
    icon: ExternalLinkIcon,
    disabled: false,
  },
  {
    name: "type",
    alt: "Payment Type",
    placeholder: "",
    label: "Payment Type",
    type: "text",
    icon: ExternalLinkIcon,
    disabled: false,
  },
  {
    name: "currency",
    alt: "Currency",
    placeholder: "",
    label: "Select Currency",
    type: "text",
    icon: ExternalLinkIcon,
    disabled: false,
  },
  {
    name: "currency",
    alt: "Currency",
    placeholder: "",
    label: "Select Currency",
    type: "text",
    icon: ExternalLinkIcon,
    disabled: false,
  },
];

export const AddProductFormProps = z.object({
  name: z.string().min(1),
  description: z.string().or(z.undefined()),
  isActive: z.boolean(),
  unitLabel: z.string().or(z.undefined()),
  type: z.string().min(1, {
    message: "required",
  }),
  currency: z.string().min(1, "required"),
  unitAmount: z.string().min(1, "required"), // "50_000_000_000"
  url: z.string().or(z.undefined()),
});

export type AddProductFormSchema = z.infer<typeof AddProductFormProps>;

export const productFormDefaults: Omit<
  AddProductFormSchema,
  "isActive" | "type" | "currency" | "unitAmount"
> = {
  name: "",
  description: "",
  unitLabel: "",
  url: "",
};

export const productResource: AddProductSchema = {
  defaultPriceData: {
    currency: "usdc",
    type: "one_time",
    unitAmount: getUnitAmount(500), // "50_000_000_000"
    // unitAmount: '9223372036854775807',
    interval: "day",
    intervalCount: 1,
  },
  name: "Golden Buddha",
  description: "Hidden Treasure",
  isActive: true,
  unitLabel: "piece",
  url: undefined,
};
