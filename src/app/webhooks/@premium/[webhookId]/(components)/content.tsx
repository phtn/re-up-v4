"use client";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import Areas from "../[endpointId]/(endpoint)/graph/areas";
import tw from "tailwind-styled-components";
import { type LucideIcon, MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@src/utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/app/(ui)/accordion";

export const PageContent = () => {
  return (
    <div className="h-[640px] w-full">
      <div className="grid h-[640px] grid-cols-1 md:grid-cols-4">
        <PanelContainer>
          <div className="m-4 space-y-4">
            <PanelGroup title="Webhook Settings" data={webhookGroup} />
          </div>
        </PanelContainer>
        <div className="col-span-3 border-t-[0.33px] border-opus/30 bg-void">
          <ParentSize>
            {({ width, height }) => <Areas width={width} height={height} />}
          </ParentSize>
        </div>
      </div>
    </div>
  );
};

const PanelGroupTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center space-x-2 md:space-x-3">
      <p className="font-sans text-[12px] font-semibold text-gray-400 md:tracking-tighter">
        {title}
      </p>
      <MinusIcon className="size-4 stroke-[1px] text-cord/50" />
    </div>
  );
};

interface PanelListItems {
  id: number;
  title: string;
  description?: string;
  onClick: () => null;
  extra?: string;
}

type PanelItemProps = {
  id: number;
  title: string;
  icon: LucideIcon;
  extra?: string | undefined;
  items: PanelListItems[];
};

const webhookGroup: PanelItemProps[] = [
  {
    id: 0,
    title: "Webhook",
    icon: PlusIcon,
    extra: "Extra",
    items: [
      { id: 0, title: "App ID", onClick: () => null },
      { id: 1, title: "Create New Webhook", onClick: () => null },
      { id: 2, title: "Update Webhook", onClick: () => null },
      { id: 3, title: "Delete Webhook", onClick: () => null },
      { id: 4, title: "Check Health", onClick: () => null },
      { id: 5, title: "Deactivate", onClick: () => null },
    ],
  },
  {
    id: 1,
    title: "Endpoints",
    icon: PlusIcon,
    extra: "Extra",
    items: [
      { id: 0, title: "Webhook", onClick: () => null },
      { id: 1, title: "Webhook", onClick: () => null },
      { id: 2, title: "Webhook", onClick: () => null },
      { id: 3, title: "Webhook", onClick: () => null },
      { id: 4, title: "Webhook", onClick: () => null },
      { id: 5, title: "Webhook", onClick: () => null },
    ],
  },
  {
    id: 2,
    title: "Event Types",
    icon: PlusIcon,
    extra: "Extra",
    items: [
      { id: 0, title: "Webhook", onClick: () => null },
      { id: 1, title: "Webhook", onClick: () => null },
      { id: 2, title: "Webhook", onClick: () => null },
      { id: 3, title: "Webhook", onClick: () => null },
      { id: 4, title: "Webhook", onClick: () => null },
      { id: 5, title: "Webhook", onClick: () => null },
    ],
  },
  {
    id: 3,
    title: "Messages",
    icon: PlusIcon,
    extra: "Extra",
    items: [
      { id: 0, title: "Webhook", onClick: () => null },
      { id: 1, title: "Webhook", onClick: () => null },
      { id: 2, title: "Webhook", onClick: () => null },
      { id: 3, title: "Webhook", onClick: () => null },
      { id: 4, title: "Webhook", onClick: () => null },
      { id: 5, title: "Webhook", onClick: () => null },
    ],
  },
];

type PanelGroupProps = {
  title: string;
  data: PanelItemProps[];
};
const PanelGroup = ({ title, data }: PanelGroupProps) => {
  return (
    <Accordion type="multiple">
      <PanelGroupTitle title={title} />
      {data.map((panel) => (
        <PanelItem key={panel.id} {...panel} />
      ))}
    </Accordion>
  );
};

const PanelItem = (props: PanelItemProps) => {
  return (
    <PanelItemContainer value={props.title}>
      <AccordionTrigger>
        <PanelItemTitle>
          <props.icon className={cn("size-4 text-cord/80")} />
          <p>{props.title}</p>
        </PanelItemTitle>
      </AccordionTrigger>
      <PanelItemContent>
        <PanelListItemContainer>
          {props.items.map((item) => {
            return <PanelListItem key={item.id} {...item} />;
          })}
        </PanelListItemContainer>
      </PanelItemContent>
    </PanelItemContainer>
  );
};

const PanelListItem = ({ title, onClick }: PanelListItems) => {
  return (
    <Item onClick={onClick}>
      {" "}
      <p>{title}</p>
    </Item>
  );
};

const PanelItemContainer = tw(AccordionItem)`
  border-b-[0.33px] border-cord/50
  `;

const PanelItemTitle = tw.div`
  flex items-center space-x-4 font-mono text-[12px] font-semibold text-ash
  md:text-xs uppercase md:tracking-widest
  w-[240px] h-[40px]
  `;
const PanelItemContent = tw(AccordionContent)`
  h-full
  `;
const PanelListItemContainer = tw.div`
  w-full h-full

  `;
const Item = tw.div`
 flex items-center space-x-4 font-mono text-[12px] font-semibold text-zap
  `;
const PanelContainer = tw.div`
  bg-void bg-[url('/svg/dots.svg')] bg-contain bg-no-repeat
  border-t-[0.33px] border-opus/30
  h-[640px] w-full

  `;
