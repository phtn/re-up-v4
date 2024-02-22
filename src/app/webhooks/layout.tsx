import { type ReactNode } from "react";
import { Navbar } from "../account/navbar";

const WebhooksLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-y-scroll bg-zap">
      <Navbar />
      {children}
    </div>
  );
};
export default WebhooksLayout;
