import { type Children } from "@src/app/(main)/types";
import { LaunchPad } from "@src/app/(components)/launchpad";

const UserLayout = ({ children }: Children) => (
  <LaunchPad>{children}</LaunchPad>
);
export default UserLayout;
