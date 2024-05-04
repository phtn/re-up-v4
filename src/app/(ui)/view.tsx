"use client";

import { type Children } from "@src/app/(main)/types";
import { cn } from "@src/utils/cn";
import { type ReactNode } from "react";
import tw from "tailwind-styled-components";

/**
 * @name DashboardContainer
 * @description Wrapper for the dashboard view
 * @location (ui)/views
 */
export const DashboardContainer = ({ children }: Children) => {
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = tw.div`
  md:h-[714px] h-fit w-full overflow-scroll
  bg-void rounded-[3px]
`;

/**
 * @name ProductContainer
 * @description Wrapper for the dashboard view
 * @location (ui)/views
 */
type ContainerProps = {
  children: ReactNode;
  outer?: string;
  inner?: string;
};
export const ProductContainer = ({
  children,
  outer,
  inner,
}: ContainerProps) => {
  return (
    <div className={cn(outer, "flex h-fit pt-[72px]")}>
      <div className={cn(inner, "w-full md:px-[72px]")}>{children}</div>
    </div>
  );
};

/**
 * @name RootView
 * @description (ui)/views.tsx (Base View)
 */
export const RootView = tw.div`
  h-full md:h-screen
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-100 via-orange-100
`;
