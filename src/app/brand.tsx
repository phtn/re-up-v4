"use client";

import { CardBody, CardContainer } from "@@components/3d";
import { SatelliteIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import tw from "tailwind-styled-components";

export const Brand = () => {
  return (
    <Container>
      <Logo />
      <HomeLink />
    </Container>
  );
};

export const Logo = () => (
  <LogoWrap>
    <Planet>
      <Surface>
        <div className="h-[16px] w-[16px] bg-[url('/svg/logo_light.svg')] bg-contain bg-no-repeat"></div>
      </Surface>
    </Planet>
  </LogoWrap>
);

const HomeLink = () => (
  <HomeWrap>
    <Link href={"/account"}>
      <SatelliteIcon
        strokeWidth={1}
        className="text-cyan-50/50 transition-all duration-300 hover:text-cyan-50"
      />
    </Link>
  </HomeWrap>
);

const Container = tw.div`
  absolute z-50 flex h-[25vh] w-screen items-end px-[5px] md:px-[250px]
`;

const LogoWrap = tw(CardContainer)`
  inter-var
`;

const Planet = tw.div`
  object-fit rounded-full bg-[url('/svg/melancholy.svg')] bg-left transition-all duration-60000 ease-in hover:bg-center`;

const Surface = tw(CardBody)`
  flex items-center justify-center rounded-full 
  bg-gradient-to-tl from-amber-300/10 to-transparent
  group/card relative h-auto w-auto h-[8rem] w-[8rem] 
`;

const HomeWrap = tw.div`
  absolute left-[65vw] top-[2.5vh] h-[120px] w-[50px] items-center justify-center md:flex portrait:left-[80vw] portrait:top-[5vh]
`;
