"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@@components/3d";
import tw from "tailwind-styled-components";

export function Brand() {
  return (
    <Container>
      <div
        className={`object-fit rounded-full bg-[url('/svg/melancholy.svg')] bg-left transition-all duration-60000 ease-in hover:bg-center`}
      >
        <Body>
          <BrandName translateZ="50">re-up.ph</BrandName>
        </Body>
      </div>
    </Container>
  );
}

const Container = tw(CardContainer)`
  inter-var
`;

const Body = tw(CardBody)`
  flex items-center justify-center rounded-full 
  bg-gradient-to-tl from-amber-300/10 to-transparent
  group/card relative h-auto w-auto h-[8rem] w-[8rem] 
`;

const BrandName = tw(CardItem)`
  text-[14px] text-transparent bg-clip-text
  bg-gradient-to-tl from-pink-100 to-cyan-100/50
  decoration-pink-50 underline font-extrabold
`;
