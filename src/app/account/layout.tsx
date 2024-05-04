"use client";

import { TooltipProvider } from "../(ui)/tooltip";
import { RootView, ProductContainer } from "../(ui)/view";
import { TopNav } from "@src/app/(components)/topnav";
import { type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@src/lib/db";
import { onError } from "@src/utils/toast";
import { Loader } from "../services/(components)/loader";

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
      <RootView>
        <TopNav />
        <ProductContainer>
          {authed ? <div>{user}</div> : guest}
        </ProductContainer>
      </RootView>
    </TooltipProvider>
  );
};
export default AccountLayout;
