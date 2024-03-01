import { type ReactNode } from "react";
import { Navbar } from "../account/navbar";
import { ProductLayoutView, ViewContainer } from "./components";
import { WebhookProvider } from "./context";
import { checkAuth } from "@src/lib/checkAuth";

type WebhooksLayoutProps = {
  basic: ReactNode;
  premium: ReactNode;
};

const WebhooksLayout = async ({ basic, premium }: WebhooksLayoutProps) => {
  const isAuthed = await checkAuth();
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
