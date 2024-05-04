import { Tooltip, TooltipContent, TooltipTrigger } from "@src/app/(ui)/tooltip";
import { cn } from "@src/utils/cn";
import { MousePointerClickIcon } from "lucide-react";
import tw from "tailwind-styled-components";

type JustTheTipProps = {
  tip?: string;
  children: React.ReactNode;
  extra?: string;
};

/**
 * (component) - JustTheTip - Tooltip with tip and extra content
 * @description - Like I told her. Just the tip.
 */
export const TheTip = (props: JustTheTipProps) => (
  <Tooltip>
    <TooltipTrigger>{props.children}</TooltipTrigger>
    <TipContent className={props.extra ? `space-x-3` : ``}>
      <Extra className={cn(props.extra ? `flex` : ``)}>{props.extra}</Extra>{" "}
      <Tip>
        <MousePointerClickIcon size={14} />
        <p>{props.tip ?? `click to copy`}</p>
      </Tip>
    </TipContent>
  </Tooltip>
);

const TipContent = tw(TooltipContent)`
  rounded-md border-[0.33px] border-opus p-2
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-200 via-orange-50 flex items-center
  `;

const Tip = tw.div`
  text-[12px] text-dyan font-semibold font-jet
  flex items-center justify-center space-x-2
  h-[16px]
  `;

const Extra = tw.p`
  text-[10px] text-void font-light font-jet
  hidden
  `;
