import {
  SelectField,
  type SelectFieldOption,
} from "@src/app/services/(components)/select-field";

import { PackagePlusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type SelectFieldProps = {
  items: SelectFieldOption[] | undefined;
  loading: boolean;
  onSelect: Dispatch<SetStateAction<string>>;
};
export const ProductSelect = ({
  items,
  loading,
  onSelect,
}: SelectFieldProps) => {
  return (
    <SelectField
      items={items}
      icon={PackagePlusIcon}
      label="Select from existing"
      loading={loading}
      placeholder="Select Products"
      extra={<AddProductRoute />}
      onValueChange={onSelect}
    />
  );
};
const AddProductRoute = () => (
  <Link href={"/services/payments/products/add-product"}>
    <div className="m-1 flex h-[42px] items-center space-x-2 rounded-md bg-sky-400 px-2 text-white">
      <PlusIcon className="size-4" />
      <p className="font-sans text-sm font-medium tracking-tighter">
        New product
      </p>
    </div>
    <div className="flex h-[1px] w-full" />
  </Link>
);

// export const productSelectItem = (
//   list: CopperxProductDataSchema | undefined,
// ) => {
//   if (list) {
//     const items: SelectFieldOption[] = list.map((item) => ({
//       value: `${item.id}`,
//       display: `${item.name}@${getDecimalAmount(String(item.defaultPrice.unitAmount))}`,
//       disabled: false,
//     }));

//     return items;
//   }
// };
