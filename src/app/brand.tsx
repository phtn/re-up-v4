"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@@components/3d";
import tw from "tailwind-styled-components";

export function Brand() {
  return (
    <Container>
      <Body>
        <BrandName translateZ="50">re-up.ph</BrandName>
      </Body>
    </Container>
  );
}

export const Original = () => (
  <CardContainer className="inter-var">
    <CardBody className="group/card relative flex items-center justify-center border p-6">
      <CardItem translateZ="50">re-up.ph</CardItem>
    </CardBody>
  </CardContainer>
);

const Container = tw(CardContainer)`
  inter-var
`;

const Body = tw(CardBody)`
  flex items-center justify-center 
  rounded-full border-[0.1px] border-black/20
  bg-gradient-to-tl from-indigo-500/20 to-transparent
  group/card relative h-auto w-auto sm:h-[8rem] sm:w-[8rem] 
`;

const BrandName = tw(CardItem)`
  text-[14px] text-transparent bg-clip-text
  bg-gradient-to-tl from-indigo-200/50 to-pink-400/20
`;
