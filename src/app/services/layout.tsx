"use client";

import { auth } from "@src/lib/db";
import { onError } from "@src/utils/toast";
import { type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../(ui)/loader";
import { ProductContainer, RootView } from "../(ui)/view";
import { WebhookProvider } from "./context";
import { Footer } from "../(main)/footer";

type ServicesLayoutProps = {
  guest: ReactNode;
  user: ReactNode;
};
const ServicesLayout = ({ guest, user }: ServicesLayoutProps) => {
  const [cred, loading, error] = useAuthState(auth);
  if (loading) return <Loader />;
  if (error) {
    onError("Error on fetch.");
  }
  return (
    <RootView>
      <ProductContainer>
        {cred ? <WebhookProvider>{user}</WebhookProvider> : guest}
      </ProductContainer>
      <Footer />
    </RootView>
  );
};
export default ServicesLayout;
