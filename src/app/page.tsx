import Link from "next/link";
import { Brand } from "./brand";
import { Features } from "./features";
import { Jumbotron } from "./jumbotron";
import {
  CookieIcon,
  OrbitIcon,
  SatelliteDishIcon,
  SatelliteIcon,
} from "lucide-react";

export default function Home() {
  return (
    <main className="md:h-screen portrait:h-[calc(100vh-110px)]">
      <div className="absolute z-50 flex h-[25vh] w-screen items-end px-[5px] md:px-[250px]">
        <Brand />
        <HomeButton />
        <Links />
      </div>
      <div className="z-40 h-[55vh] md:h-[65vh]">
        <Jumbotron />
      </div>
      <div className="absolute z-50 h-fit w-screen items-end justify-center md:h-[20vh] md:px-24">
        <Features />
      </div>
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

const HomeButton = () => (
  <div className="absolute left-[65vw] top-[2.5vh] h-[120px] w-[50px] items-center justify-center md:flex portrait:left-[80vw] portrait:top-[5vh]">
    <Link href={"/"}>
      <SatelliteIcon
        strokeWidth={1}
        className="text-cyan-50/50 transition-all duration-300 hover:text-cyan-50"
      />
    </Link>
  </div>
);

const Links = () => (
  <div className="absolute left-[15vw] top-[2.5vh] hidden h-[120px] items-center justify-end md:w-[300px]">
    <Link
      href={"#"}
      className="group flex h-[20px] items-center justify-center"
    >
      <OrbitIcon
        strokeWidth={1}
        className="mr-1 h-4 w-4 scale-50 text-pink-100 opacity-[50%] transition-all duration-60000 ease-in-out group-hover:text-pink-400"
      />
      <p className="scale-95 text-[12px] uppercase tracking-wider text-cyan-50/60 transition-all duration-500 group-hover:scale-100 group-hover:text-cyan-100"></p>
    </Link>
  </div>
);
