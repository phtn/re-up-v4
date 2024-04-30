"use client";

import tw from "tailwind-styled-components";

import { useAccountInfo } from "./hooks";
import { DashboardContainer } from "../webhooks/(components)/views";

/**
 * @component
 * @name AccountDashboard
 * @description - a component that displays the user's webhooks and active apps.
 */
export const AccountDashboard = () => {
  const { profile } = useAccountInfo();
  return (
    <DashboardContainer>
      <div className="h-[500px] w-full bg-void">Yo</div>
    </DashboardContainer>
  );
};
const Container = tw.div`
  grid h-fit w-full gap-4 grid-cols-1 md:grid-cols-3
`;
