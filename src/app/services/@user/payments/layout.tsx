"use client";

import { type Children } from "@src/app/(main)/types";
import { Sidebar } from "@src/app/(ui)/sidenav";
import { navlist } from "./(components)/navlist";
import { ChevronRightIcon, ListTreeIcon, SquareEqualIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PaymentsProvider } from "./(context)/context";

const baseRoute = "/services/payments";

const PaymentsLayout = ({ children }: Children) => {
  const pathname = usePathname();
  return (
    <PaymentsProvider>
      <div className="h-full bg-gradient-to-b from-sky-400/80 via-sky-200 to-sky-100/50">
        <Header pathname={pathname} />
        <div className="grid grid-cols-5 overflow-hidden bg-white backdrop-blur-lg">
          <div className="portrait:col-span-0 col-span-1 flex w-full justify-start px-4 portrait:px-0">
            <Sidebar navlist={navlist} />
          </div>
          <div className="col-span-4 h-[640px] w-full portrait:col-span-5">
            {children}
          </div>
        </div>
      </div>
    </PaymentsProvider>
  );
};

type PaymentsHeaderProps = {
  pathname: string;
};
const Header = ({ pathname }: PaymentsHeaderProps) => (
  <div className="flex h-[72px] w-full items-center justify-between px-4 text-sky-50 portrait:h-[42px] portrait:px-2">
    <div className="flex items-center space-x-2">
      <ListTreeIcon className="size-6 portrait:hidden" />
      <p className="text-xl font-semibold tracking-tighter portrait:text-sm">
        Payments <span className="font-light">&</span> Invoicing
      </p>
    </div>

    <div className="flex items-center space-x-8">
      <div className=" flex items-center space-x-8 text-sm font-medium tracking-tight portrait:hidden">
        <Link href={`${baseRoute}/invoices/create/0/0`}>Create Invoice</Link>
        <Link href={`${baseRoute}/customers/add-customer`}>+ Customer</Link>
        <Link href={`${baseRoute}/products/add-product`}>+ Product</Link>
      </div>
      {pathname === baseRoute ? null : (
        <Link
          href={baseRoute}
          className="flex items-center space-x-2 portrait:space-x-1"
        >
          <SquareEqualIcon className="size-5 stroke-[1.5px] portrait:size-4" />
          <ChevronRightIcon className="size-4 stroke-1" />
        </Link>
      )}
    </div>
  </div>
);

export default PaymentsLayout;
