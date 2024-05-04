import { LaunchPad } from "@src/app/(components)/launchpad";
import { UserContent } from "./(user)/content";
import { ServicesNavbar } from "./(user)/nav";

const UserPage = async () => (
  <LaunchPad>
    <ServicesNavbar />
    <UserContent />
  </LaunchPad>
);
export default UserPage;
