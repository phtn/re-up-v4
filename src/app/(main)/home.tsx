"use client";

import { HeaderTwo } from "./hero";
import { GridCol } from "../(components)/grid";
import { ClearBase, Pad } from "../(components)/launchpad";
import {
  DatabaseIcon,
  ListTreeIcon,
  ScanTextIcon,
  WebhookIcon,
} from "lucide-react";
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
        <div className="flex h-[500px] items-end border-0 border-blue-500 portrait:h-fit portrait:pt-16">
          <HeaderTwo />
        </div>
      </ClearBase>
      <ClearBase className="col-span-3 p-4">
        <div className="mx-10 flex h-[500px] items-end portrait:mx-0 portrait:items-start portrait:pb-6 portrait:pt-4">
          <Carousel
            plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
          >
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
            <CarouselPrevious className="text-cyan-700 portrait:hidden" />
            <CarouselNext className="text-cyan-700 portrait:hidden" />
          </Carousel>
        </div>
      </ClearBase>
    </GridCol>
  </>
);

const WebhooksCover = () => (
  <Pad>
    <SlideCover>
      <SlideHeader>
        <div className="flex items-start space-x-2">
          <div className="flex items-center py-1">
            <WebhookIcon className="size-6 text-sky-900" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-dyan">
            Webhooks
          </h2>
        </div>
      </SlideHeader>
      <div className="col-span-2 w-full">
        <PersV4 />
      </div>
    </SlideCover>
  </Pad>
);

const InvoicingCover = () => (
  <Pad>
    <AntiSlideCover>
      <SlideHeader>
        <div className="flex items-start space-x-2">
          <div className="flex items-center py-1">
            <ListTreeIcon className="size-6 text-sky-100" />
          </div>

          <div className="whitespace-nowrap">
            <p className="text-2xl font-bold tracking-tight text-cyan-100">
              Payments &
            </p>

            <p className="flex items-center text-2xl font-bold tracking-tight text-cyan-100">
              {`Invoicing`}
            </p>
          </div>
        </div>
      </SlideHeader>
      <div className="col-span-2 w-full">
        <PersV2 />
      </div>
    </AntiSlideCover>
  </Pad>
);

const OCRCover = () => (
  <Pad>
    <SlideCoverV3>
      <SlideHeader>
        <div className="flex items-start space-x-2">
          <div className="flex items-center py-1">
            <ScanTextIcon className="size-6 text-cyan-800" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-void/70">
            OCR Document Readers
          </h2>
        </div>
      </SlideHeader>
      <div className="col-span-2 w-full">
        <PersV3 />
      </div>
    </SlideCoverV3>
  </Pad>
);

const DatabaseCover = () => (
  <Pad>
    <SlideCoverV4>
      <SlideHeader>
        <div className="flex items-start space-x-2">
          <div className="flex items-center py-1">
            <DatabaseIcon className="size-6 text-cyan-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-cyan-100">
              Realtime
            </h2>
            <h2 className="text-2xl font-bold tracking-tight text-cyan-100">
              Database
            </h2>
          </div>
        </div>
      </SlideHeader>
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
const SlideCover = tw.div`portrait:h-[200px] h-full grid grid-cols-3 bg-gradient-to-br from-transparent via-cyan-950/80 via-70% to-90% to-void`;
const AntiSlideCover = tw.div`portrait:h-[200px] h-full grid grid-cols-3 bg-gradient-to-r from-sky-500 from-70% to-transparent`;
const SlideCoverV3 = tw.div`portrait:h-[200px] h-full grid grid-cols-3 bg-gradient-to-r from-transparent to-rose-600/60 to-60%`;
const SlideCoverV4 = tw.div`portrait:h-[200px] h-full grid grid-cols-3 bg-gradient-to-r from-indigo-700 to-transparent`;

const SlideHeader = tw.div`
  col-span-1 p-6 portrait:h-full portrait:p-3
  `;
