"use client";

import { type SwitchProps } from "@radix-ui/react-switch";
import { type Children } from "@src/app/(main)/types";
import { Switch } from "@src/app/(ui)/switch";
import { type LucideIcon } from "lucide-react";
import { useCallback } from "react";
import tw from "tailwind-styled-components";
import { InputLabel } from "./input-label";

export type CustomSwitchProps = {
  position: "top" | "mid" | "bottom";
  label: string;
  icon: LucideIcon;
  on: string;
  off: string;
};

export const SwitchOption = (props: SwitchProps & CustomSwitchProps) => {
  const Container = useCallback(
    ({ children }: Children) => {
      return (
        <div>
          {props.position === "top" ? (
            <TopSwitch>{children}</TopSwitch>
          ) : props.position === "mid" ? (
            <MidSwitch>{children}</MidSwitch>
          ) : (
            <BotSwitch>{children}</BotSwitch>
          )}
        </div>
      );
    },
    [props],
  );

  return (
    <Container>
      <props.icon className="size-5 w-14 text-dyan" strokeWidth={1.5} />

      <div className="flex h-[64px] w-full flex-col space-y-1 border-l-[0.33px] border-ash/50 bg-white/90">
        <InputLabel label={props.label} />
        <div className=" flex w-full items-end justify-between px-3">
          <p className="text-[16px] font-medium tracking-tighter text-dyan">
            {props.checked ? props.on : props.off}
          </p>
          <Switch {...props} />
        </div>
      </div>
    </Container>
  );
};

const TopSwitch = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-gray-50
  border-dyan/50
  border-[0.33px] border-b-dyan/20
  rounded-lg rounded-b-none
  `;

const MidSwitch = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-gray-50
  border-[0.33px] border-dyan/50
  border-b-dyan/20 border-t-0
  rounded-none
  `;

const BotSwitch = tw.div`
  flex h-[64px] items-center overflow-clip
  bg-gray-50 border-[0.33px] border-dyan/50
  border-t-0
  rounded-lg rounded-t-none
  `;
