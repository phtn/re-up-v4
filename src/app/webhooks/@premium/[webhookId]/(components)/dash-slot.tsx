import { type ReactNode } from "react";

type DashboardSlotProps = {
  children: ReactNode;
};
export const DashboardSlot = ({ children }: DashboardSlotProps) => {
  return <div className="h-[528px] bg-void">{children}</div>;
};
