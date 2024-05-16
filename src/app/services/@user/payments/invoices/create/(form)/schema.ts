import { type IconName } from "@src/app/(ui)/input";
import {
  type LucideIcon,
  SquareGanttChartIcon,
  BitcoinIcon,
  RepeatIcon,
  CalendarRangeIcon,
} from "lucide-react";
import { z } from "zod";
// import { getUnitAmount } from "../../../(hooks)/helpers";
import { Currency, PaymentType } from "@src/server/resource/copperx/common";
import { type InputType } from "@src/utils/helpers";

export interface InvoiceField {
  name: "description" | "dueDate" | "currency" | "type";
  alt: IconName;
  icon: LucideIcon;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  disabled: boolean;
  inputType: InputType;
}

export const invoiceFields: InvoiceField[] = [
  {
    name: "description",
    alt: "description",
    placeholder: "Brief description",
    label: "Brief description",
    type: "text",
    icon: SquareGanttChartIcon,
    disabled: false,
    inputType: "text",
  },
  {
    name: "dueDate",
    alt: "interval",
    placeholder: "Due in",
    label: "Due in",
    type: "text",
    icon: CalendarRangeIcon,
    disabled: false,
    inputType: "text",
  },
  {
    name: "currency",
    alt: "currency",
    placeholder: "Currency",
    label: "Currency",
    type: "text",
    icon: BitcoinIcon,
    disabled: false,
    inputType: "text",
  },
  {
    name: "type",
    alt: "type",
    placeholder: "Payment type",
    label: "Payment type",
    type: "text",
    icon: RepeatIcon,
    disabled: false,
    inputType: "text",
  },
];

export const CreateInvoiceFormProps = z.object({
  description: z.string(),
  dueDate: z.string(),
  currency: Currency,
  type: PaymentType,
});

export type CreateInvoiceFormSchema = z.infer<typeof CreateInvoiceFormProps>;

export const invoiceFormDefaults: CreateInvoiceFormSchema = {
  description: "Test Invoice",
  dueDate: "2024-05-08T15:59:59.999Z",
  currency: "usdt",
  type: "one_time",
};

/**
export const CreateInvoiceResource = z.object({
  description: z.string(),
  customFields: z.object({
    fields: z.array(z.object({ name: z.string(), value: z.string() })),
  }),
  dueDate: z.string(),
  footer: z.string(),
  fromInvoiceId: z.string(),
  clientReferenceId: z.string(),
  allowPromotionCodes: z.boolean(),
  customerId: z.string(),
  lineItems: z.object({
    data: z.array(
      z.object({
        priceId: z.string(),
        priceData: z.object({
          currency: Currency,
          interval: Interval,
          intervalCount: z.number(),
          unitAmount: z.number(), // "50_000_000_000" == 500 USDT
          productId: z.string(),
          productData: z.object({
            name: z.string(),
            description: z.string(),
            images: z.array(z.string()),
            unitLabel: z.string(),
            url: z.string(),
          }),
          type: PaymentType,
        }),
        quantity: z.number(),
        periodStart: z.string(),
        periodEnd: z.string(),
      }),
    ),
  }),
  paymentSetting: z.object({
    allowedChains: z.array(z.object({ chainId: z.number() })),
    preferredChainId: z.number(),
    preferredCurrency: Currency,
    allowSwap: z.boolean(),
  }),
});
*/
