import { cn } from "@src/utils/cn";
import { type ReactNode } from "react";

type ViewProps = {
  children: ReactNode;
  outer?: string;
  inner?: string;
};

export const View = ({ children, outer, inner }: ViewProps) => {
  return (
    <div className={cn(outer, "flex h-fit pt-[72px]")}>
      <div className={cn(inner, "w-full md:px-[108px]")}>{children}</div>
    </div>
  );
};
