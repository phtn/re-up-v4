"use client";

import { type Children } from "@src/app/(main)/types";
import { cn } from "@src/utils/cn";
import { type ReactNode } from "react";
import tw from "tailwind-styled-components";

/**
 * @name DashboardContainer
 * @description Wrapper for the dashboard view
 * @param {ReactNode} children
 * @location components/(components)/views
 */
export const DashboardContainer = ({ children }: Children) => {
  return <Container>{children}</Container>;
};
const Container = tw.div`
  md:h-[714px] h-fit w-full overflow-scroll
  bg-void rounded-[3px]
`;

/**
 * @name ViewContainer
 * @description Wrapper for the dashboard view
 * @param {ReactNode} children
 * @param {string} outer
 * @param {string} inner
 * @location components/(components)/views
 */
type ViewProps = {
  children: ReactNode;
  outer?: string;
  inner?: string;
};

export const ViewContainer = ({ children, outer, inner }: ViewProps) => {
  return (
    <div className={cn(outer, "flex h-fit pt-[72px]")}>
      <div className={cn(inner, "w-full md:px-[72px]")}>{children}</div>
    </div>
  );
};

export const ProductLayoutView = tw.div`
  h-full md:h-screen
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-100 via-orange-100
`;
