import { HomeIcon, MixIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Brand } from "./brand";
import { Features } from "./features";
import { Jumbotron } from "./jumbotron";

export default function Home() {
  return (
    <main className="">
      <div className="absolute z-50 flex h-[25vh] w-screen items-end px-[5px] md:px-[250px]">
        <Brand />
        <HomeButton />
        <Links />
      </div>
      <div className="z-40 h-[60vh]">
        <Jumbotron />
      </div>
      <div className="absolute z-50 w-screen items-end justify-center bg-black md:h-[20vh] md:bg-transparent md:px-24">
        <Features />
      </div>
      <div className="absolute top-[90vh] flex h-20 w-screen items-center justify-center bg-black text-[12px] font-light text-neutral-500">
        &copy; Re-Up. All rights reserved. {new Date().getFullYear()}
      </div>
    </main>
  );
}

const HomeButton = () => (
  <div className="absolute left-[25vw] top-[2.5vh] hidden h-[120px] w-[100px] items-center justify-center md:flex">
    <Link href={"/"}>
      <HomeIcon className="text-cyan-50/50 transition-all duration-300 hover:text-cyan-50" />
    </Link>
  </div>
);

const Links = () => (
  <div className="absolute left-[55vw] top-[2.5vh] flex h-[120px] items-center justify-end md:w-[300px]">
    <Link
      href={"/tools"}
      className="group flex h-[20px] items-center justify-center"
    >
      <MixIcon className="mr-1 h-[18px] w-[18px] scale-50 text-pink-100 transition-all duration-[700ms] ease-in-out group-hover:mr-2 group-hover:rotate-[540deg] group-hover:skew-x-[360deg] group-hover:scale-100 group-hover:text-pink-400" />
      <p className="scale-95 text-[12px] uppercase tracking-wider text-cyan-50/60 transition-all duration-500 group-hover:scale-100 group-hover:text-cyan-100">
        Tools
      </p>
    </Link>
  </div>
);
