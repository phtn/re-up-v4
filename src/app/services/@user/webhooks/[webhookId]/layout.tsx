import { LaunchPad } from "@src/app/(components)/launchpad";
import { type Children } from "@src/app/(main)/types";

const WebhookLayout = ({ children }: Children) => {
  return <LaunchPad>{children}</LaunchPad>;
};
export default WebhookLayout;
