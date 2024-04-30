"use client";

import { CardBody, CardContainer } from "@@ui/3d";
import { SatelliteIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import tw from "tailwind-styled-components";
import { CardContent } from "../(ui)/card";

export const Brand = () => {
  return (
    <Container>
      <Logo />
      <HomeLink />
    </Container>
  );
};

export const Logo = () => (
  <CardContent>
    <Planet>
      <Surface>
        <div className="h-[20px] w-[20px] bg-[url('/svg/logo_light.svg')] bg-contain bg-no-repeat" />
      </Surface>
    </Planet>
  </CardContent>
);

const HomeLink = () => (
  <HomeWrap>
    <Link href={"/account"}>
      <SatelliteIcon
        strokeWidth={1}
        className="text-cyan-50/50 transition-colors duration-300 hover:text-cyan-50"
      />
    </Link>
  </HomeWrap>
);

const Container = tw.div`
  absolute z-50 flex h-[25vh] w-screen items-end px-[5px] md:px-[250px]
`;

const Planet = tw.div`
  object-fit rounded-full bg-[url('/svg/melancholy.svg')] bg-left transition-all duration-5000 ease-in hover:bg-center`;

const Surface = tw(CardBody)`
  flex items-center justify-center rounded-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-gray-300/10 via-blue-400/10 to-orange-50
  group/card relative h-auto w-auto h-[8rem] w-[8rem]
`;

const HomeWrap = tw.div`
  absolute left-[80vw] top-[2.5vh] h-[100px] w-[50px] items-center justify-center md:flex portrait:left-[80vw] portrait:top-[5vh]
`;
