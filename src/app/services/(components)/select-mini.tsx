import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/app/(ui)/select";
import { type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import tw from "tailwind-styled-components";

export interface SelectMiniOption {
  value: string;
  display: string;
  disabled: boolean;
}

type SelectMiniProps<T> = {
  items: SelectMiniOption[] | undefined;
  icon?: LucideIcon;
  image?: string;
  title?: string;
  label: string;
  loading: boolean;
  placeholder: string;
  extra?: React.ReactElement;
  onValueChange: Dispatch<SetStateAction<T>>;
};

export const SelectMini = <T,>(props: SelectMiniProps<T>) => {
  const { items, loading, placeholder, onValueChange } = props;

  const onChange = (value: string) => {
    onValueChange(value as T);
  };
  return (
    <Select onValueChange={onChange}>
      <Trigger caretLoading={loading}>
        <SelectValue placeholder={placeholder} />
      </Trigger>
      <SelectContent className="bg-white/80 backdrop-blur-lg">
        <SelectGroup>
          {items?.map((item) => (
            <SelectItem
              className="flex h-[36px] w-full cursor-pointer font-sans font-medium tracking-tight text-copper hover:bg-white"
              defaultValue={items[0]?.value}
              key={item.value}
              disabled={item.disabled}
              value={item.value}
            >
              <ItemDisplay display={item.display} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const ItemDisplay = ({ display }: { display: string }) => {
  const split = display.split("@");
  return (
    <div className="flex w-fit items-center space-x-2 font-semibold">
      {split[1] ? (
        <Image
          src={`${split[1]}`}
          alt={`${split[0]}`}
          className="size-4"
          height={16}
          width={20}
        />
      ) : null}

      <div className="">{split[0]}</div>
    </div>
  );
};

const Trigger = tw(SelectTrigger)`
  h-8 text-[14px] flex items-start space-x-2
  rounded-[4px] border-clay/50 border-[0.33px]
  font-sans font-semibold tracking-tighter text-dyan
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-50/90 via-slate-100 to-sky-50 w-full
  `;
