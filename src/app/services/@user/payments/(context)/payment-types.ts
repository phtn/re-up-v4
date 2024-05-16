import { type SelectOptionType } from "@src/app/services/(components)/select-options";

export const paymentTypes: SelectOptionType[] = [
  {
    label: "One Time",
    complete: "Collect once",
    value: "one_time",
    disabled: false,
  },
  {
    label: "Recurring",
    complete: "Collect on interval",
    value: "recurring",
    disabled: false,
  },
];
