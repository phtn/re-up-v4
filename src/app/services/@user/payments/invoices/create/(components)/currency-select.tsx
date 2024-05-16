// import { SelectOption } from "@src/app/services/(components)/select-options";
// import { type SelectItemProps } from "@src/app/services/(components)/select-options";
// import { type CurrencySchema } from "@src/server/resource/copperx/common";
// import type { Dispatch, SetStateAction } from "react";

// type SelectFieldProps<T> = {
//   items: SelectItemProps[] | undefined;
//   loading: boolean;
//   onSelect: Dispatch<SetStateAction<T>>;
// };

// type CurrencySelectList = {
//   label: string;
//   complete: string;
//   value: CurrencySchema;
//   disabled: boolean;
//   url: string;
//   hot?: boolean;
// };

// export const currencySelectItems = (list: CurrencySelectList[]) => {
//   if (list) {
//     const items: SelectItemProps[] = list.map((item) => ({
//       value: `${item.value}`,
//       display: `${item.label}@${item.complete}@${item.url}`,
//       disabled: item.disabled,
//     }));

//     return items;
//   }
// };
