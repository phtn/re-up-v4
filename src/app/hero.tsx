"use client";

import { Strings } from "@@components/wave";
import tw from "tailwind-styled-components";
import { Actions } from "./actions";

export const Hero = () => {
  return (
    <div className="z-40 h-[55vh] md:h-[65vh]">
      <Strings speed="slow">
        <Tron />
      </Strings>
    </div>
  );
};

const Header = () => (
  <div className="flex flex-col items-center space-y-4">
    <Title>Web Technologies for Business.</Title>
    <DescWrap>
      <Description>
        Building web services for modern business applications.
      </Description>
    </DescWrap>
  </div>
);

const Tron = () => (
  <Container>
    <Outer>
      <Inner>
        <Header />
        <Actions />
      </Inner>
    </Outer>
  </Container>
);

const Container = tw.section`
  w-screen pt-28 pb-14 md:py-24 lg:py-24 xl:py-48 overflow-hidden
`;
const Outer = tw.div`
  px-4 md:px-6
`;
const Inner = tw.div`
  flex flex-col items-center space-y-8 text-center overflow-hidden
`;
const Title = tw.h1`
  h-fit bg-gradient-to-tr from-zap to-white bg-clip-text 
  text-3xl font-bold tracking-tighter text-transparent sm:text-4xl 
  md:h-[56px] md:text-4xl lg:text-5xl portrait:max-w-[14ch]
`;
const DescWrap = tw.div`
  px-12 md:px-1
`;
const Description = tw.p`
  bg-clip-text text-sm md:text-xl text-transparent md:font-medium
  bg-gradient-to-r from-sky-200/80 to-cyan-100/60 portrait:max-w-[24ch]
`;
