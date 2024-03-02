"use client";

import tw from "tailwind-styled-components";
import { type Children } from "@src/app/types";
import { type ReactNode } from "react";
import { cn } from "@src/utils/cn";

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
  h-[500px] bg-mojo border
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
      <div className={cn(inner, "w-full md:px-[108px]")}>{children}</div>
    </div>
  );
};

export const ProductLayoutView = tw.div`
  h-full bg-zap md:h-screen
`;
