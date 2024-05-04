"use client";

import { type Children } from "@src/app/(main)/types";
import { Sidebar } from "@src/app/(ui)/sidenav";
import { navlist } from "./(components)/navlist";
import { ListTreeIcon } from "lucide-react";

const InvoicingLayout = ({ children }: Children) => {
  return (
    <div className="h-full bg-gradient-to-b from-sky-400/80 via-sky-200 to-sky-100/50">
      <Header />
      <div className="grid grid-cols-5 overflow-hidden bg-white backdrop-blur-lg">
        <div className="col-span-1 flex w-full justify-start px-4">
          <Sidebar navlist={navlist} />
        </div>
        <div className="col-span-4 h-[640px] w-full">{children}</div>
      </div>
    </div>
  );
};

const Header = () => (
  <div className="flex h-[72px] w-full items-center space-x-4 px-4 text-sky-50">
    <ListTreeIcon className="size-6" />
    <p className="text-xl font-semibold tracking-tighter">
      Payments <span className="font-light">&</span> Invoicing
    </p>
  </div>
);

export default InvoicingLayout;
