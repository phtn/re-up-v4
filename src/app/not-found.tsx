import Link from "next/link";
import { Logo } from "./(main)/brand";

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-[calc(100vw)] items-center justify-center">
      <div className="flex space-x-4">
        <Logo />
        <div className="h flex flex-col space-y-2 py-6">
          <p className="text-lg font-bold text-neutral-200">
            You have done well young earthling!
          </p>
          <div className="max-w-[40ch] text-xs text-neutral-400">
            If you&apos;re looking to exit the simulation and go back to base
            reality, this link might help you →{" "}
            <Link
              href={"/"}
              className="bg-gradient-to-r from-cyan-200 via-rose-300 to-sky-300 bg-clip-text font-semibold tracking-tighter text-transparent"
            >
              escape hatch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
