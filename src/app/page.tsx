import { Brand } from "./brand";
import { Features } from "./features";
import { Jumbotron } from "./jumbotron";

export default function Home() {
  return (
    <main>
      <div className="absolute z-50 flex h-[25vh] w-screen items-end px-[5px] md:px-[250px]">
        <Brand />
      </div>
      <div className="z-40 h-[60vh]">
        <Jumbotron />
      </div>
      <div className="absolute z-50 w-screen items-end justify-center md:h-[20vh] md:px-24">
        <Features />
        <div className="flex h-44 items-center justify-center text-[12px] font-light text-neutral-500">
          &copy; Re-up.ph. All rights reserved. {new Date().getFullYear()}
        </div>
      </div>
    </main>
  );
}
