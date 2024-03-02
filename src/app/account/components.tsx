import { cn } from "@src/utils/cn";
import { type ReactNode } from "react";

/**
 * @name ViewContainer
 * @description Wrapper for the main content of the page
 * @location /account/components/ViewContainer
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
