import { Command, CommandGroup, CommandItem, CommandList } from "@@ui/command";
import { Popover, PopoverTrigger } from "@@ui/popover";
import { DarkTouch, Touch } from "@@ui/touch";
import { cn } from "@src/utils/cn";
import { opts } from "@src/utils/helpers";
import { type LucideIcon, XIcon } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import tw from "tailwind-styled-components";
import {
  Beach,
  BeachItem,
} from "../[webhookId]/[endpointId]/(endpoint)/styles";

export interface PopOptionsData {
  id: number;
  title: string;
  type: "destructive" | "normal";
  subtext?: string;
  subtextClass?: string;
  action: () => void;
  className?: string;
  icon: LucideIcon;
  iconClass?: string;
  extra?: string;
  extraClass?: string;
}

type PopOptionsProps = {
  popIcon: LucideIcon;
  label: string;
  data: PopOptionsData[] | undefined;
  children: ReactNode;
};

/**
 * PopOptions
 * @location /webhooks/(components)
 */
export const PopOptions = (props: PopOptionsProps) => {
  const { data = [] as PopOptionsData[], children, label } = props;
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const ItemOptions = useCallback((props: PopOptionsData) => {
    const options = opts(
      <NormalItem {...props} />,
      <DestructiveItem {...props} />,
    );
    return (
      <div className="border-t-[0.33px] border-opus/50">
        {options.get(props.type === "normal")}
      </div>
    );
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Touch variant={"ghost"} className="h-[64px]" onClick={toggle}>
          {children}
        </Touch>
      </PopoverTrigger>

      <Beach className="h-full">
        <div className="flex h-[45px] items-center space-x-2 bg-cyan-900/5 px-2 md:px-4">
          <props.popIcon
            className={cn(
              "size-4 text-dyan",
              label === "Endpoints" ? " -rotate-45" : "",
            )}
          />
          <p className="font-sans text-sm font-semibold tracking-tighter">
            {label}
          </p>
        </div>
        <Command>
          <CommandList>
            <CommandGroup>
              {data?.map((item) => <ItemOptions key={item.id} {...item} />)}
            </CommandGroup>
          </CommandList>
        </Command>
      </Beach>
    </Popover>
  );
};

const NormalItem = (props: PopOptionsData) => (
  <BeachItem
    key={props.id}
    onSelect={props.action}
    selected={false}
    className="h-full space-x-4"
  >
    <ItemContent
      title={props.title}
      subtext={props.subtext}
      subtextClass={props.subtextClass}
      extra={props.extra}
      extraClass={props.extraClass}
    />
  </BeachItem>
);

const DestructiveItem = (props: PopOptionsData) => (
  <CommandItem key={props.id}>
    <DarkTouch
      className="w-full text-kindle"
      tail={XIcon}
      onClick={props.action}
    >
      {props.title}
    </DarkTouch>
  </CommandItem>
);

type ItemContentProps = {
  title: string;
  extra?: string;
  extraClass?: string;
  subtext?: string;
  subtextClass?: string;
};
const ItemContent = ({
  title,
  extra,
  extraClass,
  subtext,
  subtextClass,
}: ItemContentProps) => (
  <div className="flex h-[56px] w-full flex-col justify-center space-y-2 px-2 md:px-3">
    <div className="flex w-full items-center justify-between">
      <Title>{title}</Title>
      <Extra className={cn(extraClass)}>{extra}</Extra>
    </div>
    <Subtext className={cn(subtextClass)}>{subtext}</Subtext>
  </div>
);

const Title = tw.p`
  text-sm font-semibold font-jet text-dyan
  `;
const Subtext = tw.p`
  text-[12px] text-clay font-normal font-jet
  tracking-wider
  `;
const Extra = tw.p`
  text-[11px] font-jet text-dyan
  `;
