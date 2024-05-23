"use client";

import tw from "tailwind-styled-components";
import { Actions } from "./actions";
import { ClearBase } from "../(components)/launchpad";

export const Hero = () => {
  return (
    <ClearBase className="flex items-start">
      <HeaderTwo />
    </ClearBase>
  );
};

export const Header = () => (
  <div className="flex flex-col items-start justify-center space-y-4 md:h-[400px]">
    <div>
      <Title>Technologies</Title>
      <Title>
        for <span className="font-bold">Businesses.</span>
      </Title>
    </div>
    <DescWrap>
      <Description>
        Providing tech services for modern business applications.
      </Description>
    </DescWrap>
    <Actions />
  </div>
);

export const HeaderTwo = () => (
  <div className="flex h-[400px] w-full flex-col items-start justify-center border-0 border-dyan portrait:h-fit portrait:items-center">
    <div className="">
      <Title className="">
        <span className="text-[50px] font-semibold text-dyan portrait:text-[36px]">
          Business
        </span>
      </Title>
      <Title className="">
        <span className="text-[36px] portrait:text-[28px]">Technologies.</span>
      </Title>
    </div>
    <DescWrap>
      <Description>
        Providing tech services for modern business applications.
      </Description>
    </DescWrap>
    <Actions />
  </div>
);

const Title = tw.h1`
  h-fit bg-gradient-to-tr from-void/60 to-cyan-700/60 bg-clip-text
  text-3xl font-medium tracking-tighter text-transparent sm:text-4xl
  md:h-[54px] md:text-4xl lg:text-5xl portrait:max-w-[14ch]
`;
const DescWrap = tw.div`
  px-12 md:px-1 py-8 portrait:py-4
`;
const Description = tw.p`
  text-transparent bg-clip-text portrait:text-center
  bg-gradient-to-r from-dyan/60 to-slate-800/80
  portrait:max-w-[24ch] max-w-[28ch]
  text-sm md:text-[16px] font-medium font-sans tracking-tighter
`;
