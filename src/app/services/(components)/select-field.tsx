import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@src/app/(ui)/select";
import { type LucideIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import tw from "tailwind-styled-components";

export interface SelectFieldOption {
  value: string;
  display: string;
  disabled: boolean;
}

type SelectFieldProps = {
  items: SelectFieldOption[] | undefined;
  icon: LucideIcon;
  title?: string;
  label: string;
  loading: boolean;
  placeholder: string;
  extra?: React.ReactElement;
  onValueChange: Dispatch<SetStateAction<string>>;
};

export const SelectField = (props: SelectFieldProps) => {
  const { items, label, loading, placeholder, onValueChange, extra } = props;

  const onChange = (value: string) => {
    onValueChange(value);
  };
  return (
    <Select onValueChange={onChange}>
      <Trigger caretLoading={loading}>
        <props.icon size={18} strokeWidth={1.5} className="text-dyan" />
        <SelectValue placeholder={placeholder} />
      </Trigger>
      <SelectContent className="bg-white/80 backdrop-blur-lg">
        <SelectGroup>
          {extra}
          <div className="m-1 flex h-[36px] items-center rounded-md bg-white/80 px-1">
            <SelectLabel className="font-medium tracking-tighter text-sky-600">
              {label}
            </SelectLabel>
          </div>
          {items?.map((item) => (
            <StyledItem
              defaultValue={"Select Item"}
              key={item.value}
              disabled={item.disabled}
              value={item.value}
            >
              <ItemDisplay display={item.display} />
            </StyledItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const ItemDisplay = ({ display }: { display: string }) => {
  const split = display.split("@");
  return (
    <div className="flex w-full items-center space-x-4">
      <div className="py-1">{split[0]}</div>
      <div className="text-[13px] font-normal text-copper/80">{split[1]}</div>
    </div>
  );
};

const Trigger = tw(SelectTrigger)`
  h-16 text-[16px] flex items-center justify-around space-x-3
  rounded-lg border-clay/50 border-[0.33px]
  font-sans font-semibold tracking-tighter text-dyan
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-indigo-500/30 via-teal-100/40 to-sky-50 w-full
  `;

const StyledItem = tw(SelectItem)`
  flex h-[40px] w-full cursor-pointer
  font-sans font-medium tracking-tight text-copper
  hover:bg-sky-400
  transition-colors duration-300 ease-out
  `;
