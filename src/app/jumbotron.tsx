"use client";

import { DarkTouch, Touch } from "@@components/touch";
import { WavyBackground } from "@@components/wave";
import { onSuccess } from "@@utils/toast";
import { ArrowUpRightIcon, LogInIcon } from "lucide-react";
import { type FormEvent } from "react";
import tw from "tailwind-styled-components";

export function Jumbotron() {
  return (
    <WavyBackground className="w-screen pb-32" speed="slow">
      <Tron />
    </WavyBackground>
  );
}

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

const Actions = () => {
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSuccess("Successful", "Email sent!");
  };
  return (
    <ActionWrap>
      <form className="flex items-center justify-center space-x-4 md:space-x-8">
        <DarkTouch
          size="md"
          tail={LogInIcon}
          className="w-[175px] portrait:w-[150px]"
        >
          Sign in
        </DarkTouch>
        <Touch
          className="w-[175px] portrait:w-[150px]"
          size="md"
          variant="default"
          tail={ArrowUpRightIcon}
          onClick={handleSubmit}
        >
          Sign up
        </Touch>
      </form>
    </ActionWrap>
  );
};

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
  w-full pt-28 pb-14 md:py-24 lg:py-24 xl:py-48
`;
const Outer = tw.div`
  h-fit px-4 md:px-6
`;
const Inner = tw.div`
  flex flex-col items-center space-y-8 text-center
`;
const Title = tw.h1`
  h-fit bg-gradient-to-tr from-cyan-50 to-white bg-clip-text 
  text-3xl font-bold tracking-tighter text-transparent sm:text-4xl 
  md:h-[100px] md:text-4xl lg:text-5xl max-w-[14ch]
`;
const DescWrap = tw.div`
  px-12 md:px-1
`;
const Description = tw.p`
  bg-clip-text text-[16px] text-transparent font-medium
  bg-gradient-to-r from-sky-200/80 to-cyan-100/60
`;

const ActionWrap = tw.div`
  w-full max-w-sm space-y-2
`;
