import {
  type SelectMiniOption,
  SelectMini,
} from "@src/app/services/(components)/select-mini";
import { type PaymentTypeSchema } from "@src/server/resource/copperx/common";
import type { Dispatch, SetStateAction } from "react";

type SelectFieldProps = {
  items: SelectMiniOption[] | undefined;
  loading: boolean;
  onSelect: Dispatch<SetStateAction<PaymentTypeSchema>>;
};
export const PaymentSelect = ({
  items,
  loading,
  onSelect,
}: SelectFieldProps) => {
  return (
    <SelectMini
      items={items}
      label="Payment"
      loading={loading}
      placeholder="Payment"
      onValueChange={onSelect}
    />
  );
};

type PaymentSelectList = {
  label: string;
  value: PaymentTypeSchema;
  disabled: boolean;
  url?: string;
};
export const paymentSelectItems = (list: PaymentSelectList[]) => {
  if (list) {
    const items: SelectMiniOption[] = list.map((item) => ({
      value: `${item.value}`,
      display: `${item.label}`,
      disabled: item.disabled,
    }));

    return items;
  }
};

export const paymentList: PaymentSelectList[] = [
  {
    label: "One time",
    value: "one_time",
    disabled: false,
  },
  {
    label: "Recurring",
    value: "recurring",
    disabled: false,
  },
];
