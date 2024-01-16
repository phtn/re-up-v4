"use client";

import { WavyBackground } from "@@components/wave";
import { Input } from "@@components/input";
import { Button } from "@@components/button";
import { Brand } from "./brand";
import { Features } from "./features";

export function Wave() {
  return (
    <WavyBackground className="mx-auto max-w-4xl pb-40" speed="slow">
      <Jumbotron />
    </WavyBackground>
  );
}

const Jumbotron = () => (
  <section className="w-full py-12 md:py-24 lg:py-28 xl:py-48">
    <div className="h-fit px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div>
          <h1 className="mb-2 h-[66px] bg-gradient-to-tr from-cyan-100 to-cyan-50 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
            Business Web Technologies.
          </h1>

          <div className="px-12 md:px-1">
            <p className="mx-auto max-w-[700px] text-[0.85rem] text-gray-500 md:text-xl dark:text-gray-400">
              We provide specialized applications for every business needs.
            </p>
          </div>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button variant="secondary" type="submit">
              Contact us
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main>
      <div className="absolute z-50 flex h-[300px] w-screen items-end px-[75px] font-light md:px-[250px]">
        <Brand />
      </div>
      <div>
        <Wave />
      </div>
      <div className="absolute top-[56vh] z-50 flex h-[300px] w-screen items-end justify-center font-light">
        <Features />
      </div>
    </main>
  );
}
