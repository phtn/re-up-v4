import { ServicesNavbar } from "./(premium)/navbar";
import { PremiumContent } from "./(premium)/content";
import { LaunchPad } from "@src/app/(components)/launchpad";

const Premium = async () => {
  return (
    <LaunchPad>
      <ServicesNavbar />
      <PremiumContent />
    </LaunchPad>
  );
};
export default Premium;
