"use client";

import { type ReactNode } from "react";
import { WebhookProvider } from "./context";
import { ProductLayoutView, ViewContainer } from "./(components)/views";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@src/lib/db";
import { Loader } from "./(components)/loader";
import { onError } from "@src/utils/toast";
import { MinusIcon } from "lucide-react";

type WebhooksLayoutProps = {
  basic: ReactNode;
  premium: ReactNode;
};
const WebhooksLayout = ({ basic, premium }: WebhooksLayoutProps) => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <Loader />;
  if (error) {
    onError("Error on fetch.");
  }
  return (
    <ProductLayoutView>
      <ViewContainer>
        {user ? <WebhookProvider>{premium}</WebhookProvider> : basic}
      </ViewContainer>
      <div className="flex h-[70px] w-full items-center justify-center space-x-1 md:space-x-4">
        <p className="font-sans text-[12px] font-semibold tracking-tight text-dyan">
          re-up.ph &copy;
          <span className=" mx-2 font-light">
            {new Date().getFullYear().toString()}
          </span>
        </p>
        <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
        <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
          Privacy
        </p>
        <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
        <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
          Terms
        </p>
      </div>
    </ProductLayoutView>
  );
};
export default WebhooksLayout;
