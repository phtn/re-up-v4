"use client";

import { useState } from "react";
import { TooltipProvider } from "../_components/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../_components/resizable";

import tw from "tailwind-styled-components";
import { Navbar } from "./_components/navbar";
import { links } from "./_components/data";

interface ContentProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export const Content = (props: ContentProps) => {
  let {
    defaultLayout = [200, 440, 655],
    defaultCollapsed = false,
    navCollapsedSize,
  } = props;
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleChangeLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };
  const onCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
  };
  return (
    <TooltipProvider delayDuration={0}>
      <Resizable direction="horizontal" onLayout={handleChangeLayout}>
        <Panel
          defaultSize={56}
          $isCollapsed={isCollapsed}
          collapsedSize={navCollapsedSize}
          collapsible
          minSize={15}
          maxSize={20}
          onCollapse={onCollapse}
        >
          <Navbar
            isCollapsed={(collapsed: boolean) => {
              setIsCollapsed(collapsed);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
            }}
            links={links}
          />
        </Panel>
        <ResizableHandle withHandle />
        <Panel>
          <div className="w-[500px] text-neutral-500">yo</div>
        </Panel>
      </Resizable>
      <div></div>
    </TooltipProvider>
  );
};

const Resizable = tw(ResizablePanelGroup)`
  h-full max-h-screen items-stretch
`;

const Panel = tw(ResizablePanel)<{ $isCollapsed: boolean }>`
  ${(p) => (p.$isCollapsed ? "min-w-[50px] transition-all duration-300 ease-in-out bg-neutral-200" : "bg-neutral-200")} 
`;
