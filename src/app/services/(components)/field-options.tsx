import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { type LucideIcon } from "lucide-react";
import { inputMap, type InputType } from "@src/utils/helpers";
import type { CustomerField } from "../@user/payments/customers/add-customer/(form)/schema";
import type { ProductField } from "../@user/payments/products/add-product/(form)/schema";
import type { InvoiceField } from "../@user/payments/invoices/create/(form)/schema";
import { TextInputOptions } from "./text-options";

export type FieldCategory = CustomerField | ProductField | InvoiceField;

export type FieldOptionProps<S extends FieldValues> = {
  item: FieldCategory;
  index: number;
  length: number;
  field: ControllerRenderProps<S>;
  isValid?: boolean;
};

type InputOptionProps<P> = {
  inputType: InputType;
  props: P;
};

export const InputOption = <F extends FieldValues>({
  inputType,
  props,
}: InputOptionProps<FieldOptionProps<F>>) => {
  const type: InputType = inputType;
  const options = inputMap(
    type,
    <TextInputOptions key={`${props.item.name}`} {...props} />,
  );
  return <div>{options.get(type)}</div>;
};

export interface FieldProps<T> {
  name: T;
  alt: string;
  icon: LucideIcon;
  placeholder?: string;
  inputType: InputType;
  label?: string;
  disabled: boolean;
  type: React.HTMLInputTypeAttribute;
}

// export type TextInputOptionProps<S extends FieldValues> = {
//   item: InputCatType;
//   index: number;
//   length: number;
//   field: ControllerRenderProps<S>;
// };

// type InputOptionProps<P> = {
//   inputType: InputType;
//   props: P;
// };
