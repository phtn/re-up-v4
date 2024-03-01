import { Brand } from "./brand";
import { Featured } from "./featured";
import { Hero } from "./hero";
import { CookieIcon, SatelliteDishIcon } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RE-UP.ph",
  description: "Web Technologies",
};

export default function Home() {
  return (
    <main className="overflow-hidden md:h-screen portrait:h-[calc(100vh-110px)]">
      <Brand />
      <Hero />
      <Featured />

      <div className="absolute top-[75vh] flex h-20 w-screen items-center justify-between bg-black px-2 text-[12px] font-light text-neutral-500 md:top-[90vh] md:px-10">
        <SatelliteDishIcon
          strokeWidth={1}
          className="scale-50 text-orange-100/50"
        />
        <span>
          &copy; Re-Up. All rights reserved. {new Date().getFullYear()}
        </span>
        <CookieIcon
          strokeWidth={1}
          className="scale-50"
          fill="rgba(69, 26,3,0.5)"
        />
      </div>
    </main>
  );
}
