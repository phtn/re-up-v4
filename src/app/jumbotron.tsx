"use client";

import { DarkTouch, Touch } from "@@components/touch";
import { WavyBackground } from "@@components/wave";
import { onSuccess } from "@@utils/toast";
import { ArrowUpRightIcon, LogInIcon } from "lucide-react";
import { type FormEvent } from "react";
import tw from "tailwind-styled-components";

export function Jumbotron() {
  return (
    <WavyBackground className="mx-auto max-w-4xl pb-40" speed="slow">
      <Tron />
    </WavyBackground>
  );
}

const Header = () => (
  <div>
    <Title>Web Technologies for Business</Title>
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
      <form className="flex items-center justify-center space-x-4">
        <DarkTouch size="md" tail={LogInIcon} className="w-[175px]">
          Sign in
        </DarkTouch>
        <Touch
          className="w-[175px]"
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
  w-full py-48 md:py-24 lg:py-28 xl:py-48
`;
const Outer = tw.div`
  h-fit px-4 md:px-6
`;
const Inner = tw.div`
  flex flex-col items-center space-y-4 text-center
`;
const Title = tw.h1`
  mb-2 h-fit bg-gradient-to-tr from-cyan-50 to-white bg-clip-text 
  text-4xl font-bold tracking-tighter text-transparent sm:text-4xl 
  md:h-[66px] md:text-5xl lg:text-6xl
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
