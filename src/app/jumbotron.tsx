"use client";

import { onSuccess } from "@/utils/toast";
import { Button } from "./_components/button";
import { Input } from "./_components/input";
import { WavyBackground } from "./_components/wave";
import { type FormEvent } from "react";

export function Jumbotron() {
  return (
    <WavyBackground className="mx-auto max-w-4xl pb-40" speed="slow">
      <Tron />
    </WavyBackground>
  );
}

const Tron = () => {
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSuccess("Successful", "Email sent!");
  };
  return (
    <section className="w-full py-56 md:py-24 lg:py-28 xl:py-48">
      <div className="h-fit px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div>
            <h1 className="mb-2 h-fit bg-gradient-to-tr from-cyan-100 to-cyan-50 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-4xl md:h-[66px] md:text-5xl lg:text-6xl">
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
              <Button variant="secondary" type="submit" onClick={handleSubmit}>
                Contact us
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
