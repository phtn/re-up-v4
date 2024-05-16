import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/app/(ui)/select";
import { type LucideIcon } from "lucide-react";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { type Children } from "@src/app/(main)/types";
import { InputLabel } from "./input-label";

type SelectOptionBase = {
  value: string;
  display: string;
  disabled: boolean;
};

export type SelectOptionType = {
  label: string;
  complete: string;
  value: string;
  disabled: boolean;
  url?: string;
  hot?: boolean;
};

type SelectFieldProps<T> = {
  title: string;
  label: string;
  icon: LucideIcon;
  loading: boolean;
  options: SelectOptionType[];
  onValueChange: Dispatch<SetStateAction<T>>;
  transformer: (list: SelectOptionType[]) => SelectOptionBase[] | undefined;
  position: "top" | "mid" | "bottom" | "single";
  extra?: React.ReactElement | string;
  placeholder?: string;
};

export const SelectOption = <T,>(props: SelectFieldProps<T>) => {
  const { onValueChange, options, label, loading, transformer, position } =
    props;
  const Container = useCallback(
    ({ children }: Children) => {
      return (
        <>
          {position === "top" ? (
            <TopSelect>{children}</TopSelect>
          ) : position === "mid" ? (
            <MidSelect>{children}</MidSelect>
          ) : position === "single" ? (
            <SingleSelect>{children}</SingleSelect>
          ) : (
            <BottomSelect>{children}</BottomSelect>
          )}
        </>
      );
    },
    [position],
  );

  const parsedList = transformer(options);

  const onChange = (value: string) => {
    onValueChange(value as T);
  };
  return (
    <Select onValueChange={onChange}>
      <Container>
        <SelectTrigger
          className="h-full"
          caretLoading={loading}
          caretStyle="w-16 stroke-1 opacity-100 text-dyan"
        >
          <props.icon className="size-5 w-16 text-dyan" strokeWidth={1.5} />

          <div className="flex h-full w-full flex-col items-start space-y-1 border-l-[0.33px] border-ash/50 bg-white/80">
            <InputLabel label={label} />
            <div className="flex w-full items-center justify-between px-3 text-[15px] font-medium text-dyan">
              <SelectValue />
            </div>
          </div>
        </SelectTrigger>
      </Container>
      <Content>
        <SelectGroup>
          {parsedList?.map((option) => (
            <StyledItem
              defaultValue={parsedList[0]?.value}
              key={option.value}
              disabled={option.disabled}
              value={option.value}
            >
              <ItemDisplay display={option.display} />
            </StyledItem>
          ))}
        </SelectGroup>
      </Content>
    </Select>
  );
};

const ItemDisplay = ({ display }: { display: string }) => {
  const split = display.split("@");
  return (
    <div className="flex w-full items-center space-x-4">
      {split[2] ? (
        <Image
          width={0}
          height={0}
          src={`${split[2] ?? ""}`}
          alt={`${split[0]}`}
          className="size-5"
          style={{ width: 24, height: "auto" }}
        />
      ) : null}
      <div className="py-1 text-[16px] font-semibold">{split[0]}</div>
      <div className="text-[13px] font-light">{split[1]}</div>
    </div>
  );
};

// from-cyan-200 via-orange-50
const Content = tw(SelectContent)`
  border-[0.33px] border-dyan/20 -ml-[0.5px]
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-800 via-zinc-700/50 to-yello-500 backdrop-blur-lg
  `;
const StyledItem = tw(SelectItem)`
  flex h-[60px] px-4 w-full cursor-pointer
  font-sans font-medium tracking-tight text-zap
  transition-colors duration-300 ease-out
  hover:bg-zap/10
  `;

const TopSelect = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-gray-50
  border-dyan/50
  border-[0.33px] border-b-dyan/20
  rounded-lg rounded-b-none
  `;
const MidSelect = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-gray-50
  border-[0.33px] border-dyan/50
  border-b-dyan/20 border-t-0
  rounded-none
  `;
const BottomSelect = tw.div`
  flex h-[64px] w-full items-center overflow-clip
  bg-gray-50 border-[0.33px] border-dyan/50
  rounded-lg rounded-t-none
  border-t-0
  `;

const SingleSelect = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-gray-50
  border-dyan/50
  border-[0.33px]
  rounded-lg
  `;
