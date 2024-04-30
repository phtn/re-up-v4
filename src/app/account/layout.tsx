"use client";

import { TooltipProvider } from "../(ui)/tooltip";
import {
  ProductLayoutView,
  ViewContainer,
} from "../webhooks/(components)/views";
import { TopNav } from "@src/app/(components)/topnav";
import { type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@src/lib/db";
import { onError } from "@src/utils/toast";
import { Loader } from "../webhooks/(components)/loader";
import { Bottom } from "../(main)/bottom";

type AccountLayoutProps = {
  guest: ReactNode;
  user: ReactNode;
};

const AccountLayout = ({ guest, user }: AccountLayoutProps) => {
  const [authed, loading, error] = useAuthState(auth);
  if (loading) return <Loader />;
  if (error) {
    onError("Error on fetch.");
  }
  return (
    <TooltipProvider delayDuration={200}>
      <ProductLayoutView>
        <TopNav />
        <ViewContainer>{authed ? <div>{user}</div> : guest}</ViewContainer>
        <Bottom />
      </ProductLayoutView>
    </TooltipProvider>
  );
};
export default AccountLayout;
