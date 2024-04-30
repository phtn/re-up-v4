"use client";

import { HeaderTwo } from "./hero";
import { GridCol } from "../(components)/grid";
import { ClearBase, Pad } from "../(components)/launchpad";
import { WebhookIcon } from "lucide-react";
import tw from "tailwind-styled-components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../(ui)/carousel";
import Autoplay from "embla-carousel-autoplay";

export const Home = () => (
  <>
    <GridCol cols={5} top={72}>
      <ClearBase className="col-span-2">
        <div className="flex h-[500px] items-end">
          <HeaderTwo />
        </div>
      </ClearBase>
      <ClearBase className="col-span-3 p-4">
        <div className="mx-8 flex h-[500px] items-end">
          <Carousel plugins={[Autoplay({ delay: 6000 })]}>
            <CarouselContent>
              <CarouselItem>
                <WebhooksCover />
              </CarouselItem>
              <CarouselItem>
                <InvoicingCover />
              </CarouselItem>
              <CarouselItem>
                <OCRCover />
              </CarouselItem>
              <CarouselItem>
                <DatabaseCover />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="text-cyan-700" />
            <CarouselNext className="text-cyan-700" />
          </Carousel>
        </div>
      </ClearBase>
    </GridCol>
  </>
);

const WebhooksCover = () => (
  <Pad>
    <SlideCover>
      <div className="col-span-1 p-6">
        <div className="flex items-center space-x-2">
          <WebhookIcon className="size-6 text-cyan-800" />
          <h2 className="text-2xl font-bold tracking-tight text-cyan-950">
            Webhooks
          </h2>
        </div>
      </div>
      <div className="col-span-2 w-full">
        <PersV4 />
      </div>
    </SlideCover>
  </Pad>
);

const InvoicingCover = () => (
  <Pad>
    <AntiSlideCover>
      <div className="col-span-1 p-6">
        <div className="flex items-center space-x-2">
          <WebhookIcon className="size-6 text-cyan-500" />
          <h2 className="text-2xl font-bold tracking-tight text-cyan-100">
            Invoicing
          </h2>
        </div>
      </div>
      <div className="col-span-2 w-full">
        <PersV2 />
      </div>
    </AntiSlideCover>
  </Pad>
);

const OCRCover = () => (
  <Pad>
    <SlideCoverV3>
      <div className="col-span-1 p-6">
        <div className="flex items-center space-x-2">
          <WebhookIcon className="size-6 text-cyan-800" />
          <h2 className="text-2xl font-bold tracking-tight text-void/70">
            OCR Document Reader
          </h2>
        </div>
      </div>
      <div className="col-span-2 w-full">
        <PersV3 />
      </div>
    </SlideCoverV3>
  </Pad>
);

const DatabaseCover = () => (
  <Pad>
    <SlideCoverV4>
      <div className="col-span-1 p-6">
        <div className="flex items-center space-x-2">
          <WebhookIcon className="size-6 text-cyan-500" />
          <h2 className="text-2xl font-bold tracking-tight text-cyan-100">
            Database
          </h2>
        </div>
      </div>
      <div className="col-span-2 w-full">
        <PersV1 />
      </div>
    </SlideCoverV4>
  </Pad>
);

const PersV1 = tw.div`
  h-full bg-[url('/svg/pers.svg')] bg-cover
`;
const PersV2 = tw.div`
  h-full bg-[url('/svg/pers_v2.svg')] bg-cover
`;
const PersV3 = tw.div`
  h-full bg-[url('/svg/pers_v3.svg')] bg-cover
`;
const PersV4 = tw.div`
  h-full bg-[url('/svg/pers_v4.svg')] bg-cover
`;
const SlideCover = tw.div`grid h-full grid-cols-3 bg-gradient-to-r from-transparent via-cyan-950/80 via-35% to-60% to-void`;
const AntiSlideCover = tw.div`grid h-full grid-cols-3 bg-gradient-to-r from-sky-500 from-70% to-transparent`;
const SlideCoverV3 = tw.div`grid h-full grid-cols-3 bg-gradient-to-r from-transparent to-rose-600/60 to-60%`;
const SlideCoverV4 = tw.div`grid h-full grid-cols-3 bg-gradient-to-r from-indigo-700 to-transparent`;
