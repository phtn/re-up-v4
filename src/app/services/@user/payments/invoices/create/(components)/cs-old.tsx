import {
  type SelectFieldOption,
  SelectField,
} from "@src/app/services/(components)/select-field";
import { type CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import { PlusIcon, UserRoundPlusIcon } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type SelectFieldProps = {
  items: SelectFieldOption[] | undefined;
  loading: boolean;
  onSelect: Dispatch<SetStateAction<string>>;
};
export const CustomerSelect = ({
  items,
  loading,
  onSelect,
}: SelectFieldProps) => {
  return (
    <SelectField
      items={items}
      icon={UserRoundPlusIcon}
      label="Select from existing"
      loading={loading}
      placeholder="Add Customer"
      extra={<AddCustomerRoute />}
      onValueChange={onSelect}
    />
  );
};
const AddCustomerRoute = () => (
  <Link href={"/services/payments/customers/add-customer"}>
    <div className="m-1 flex h-[42px] items-center space-x-2 rounded-md bg-sky-400 px-2 text-white">
      <PlusIcon className="size-4" />
      <p className="font-sans text-sm font-medium tracking-tighter">
        New customer
      </p>
    </div>
    <div className="flex h-[1px] w-full" />
  </Link>
);

export const customerSelectItems = (
  list: CopperxCustomerDataSchema[] | undefined,
) => {
  if (list) {
    const items: SelectFieldOption[] = list.map((item) => ({
      value: `${item.id}`,
      display: `${item.name}@${item.organizationName}`,
      disabled: false,
    }));

    return items;
  }
};
