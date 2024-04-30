import { LaunchPad } from "@src/app/(components)/launchpad";

export default async function GuestPage() {
  return (
    <LaunchPad>
      <div className="p-10">
        <h1>Guest Page</h1>
      </div>
    </LaunchPad>
  );
}
