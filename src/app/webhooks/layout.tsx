import { type ReactNode } from "react";
import { Navbar } from "../account/navbar";
import { WebhookProvider } from "./context";
import { checkAuth } from "@src/lib/checkAuth";
import { ProductLayoutView, ViewContainer } from "./(components)/views";

type WebhooksLayoutProps = {
  basic: ReactNode;
  premium: ReactNode;
};

const WebhooksLayout = async ({ basic, premium }: WebhooksLayoutProps) => {
  const isAuthed = checkAuth();
  return (
    <ProductLayoutView>
      <Navbar />
      <ViewContainer>
        {isAuthed ? <WebhookProvider>{premium}</WebhookProvider> : basic}
      </ViewContainer>
    </ProductLayoutView>
  );
};
export default WebhooksLayout;
