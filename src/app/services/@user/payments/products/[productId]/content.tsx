"use client";

import { Button } from "@src/app/(ui)/button";
import {
  ArchiveXIcon,
  FileSymlinkIcon,
  PackageIcon,
  SettingsIcon,
} from "lucide-react";
import { useContext } from "react";
import { Header } from "../../(components)/header";
import { PaymentsContext } from "../../(context)/context";
// import { useProductSettings } from "./hooks";
import { useRouter } from "next/navigation";
import type {
  CopperxInvoiceResponseDataSchema,
  LineItemResponseSchema,
} from "@src/server/resource/copperx/invoice";

export const ProductContent = ({ id }: { id: string }) => {
  const query = useContext(PaymentsContext);
  const product = query?.products?.productList?.find(
    (product) => product.id === id,
  );
  const invoices: CopperxInvoiceResponseDataSchema[] | undefined =
    query?.invoices.invoiceList?.filter((item) =>
      item?.lineItems.data.some(
        (p: LineItemResponseSchema) => p?.price?.productId === product?.id,
      ),
    );

  const router = useRouter();
  const handleCreateInvoiceRoute = () => {
    if (product?.id) {
      router.push(`/services/payments/invoices/create/0/${product?.id}`);
    }
  };

  // const { handleCopyInfo } = useProductSettings();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 uppercase">
          <PackageIcon className="size-5 text-copper/60" />
          <Header title={`${product?.name}`} />
          <p>{id.substring(0, 13)}</p>
        </div>
        <div className="flex items-center space-x-4 px-4">
          <Button
            onClick={handleCreateInvoiceRoute}
            className="flex h-[32px] items-center space-x-2 rounded border-[0.33px] border-indigo-500/50 bg-indigo-50 text-sm text-indigo-500 transition-colors duration-300 hover:bg-indigo-500 hover:text-white"
          >
            <p>Create Invoice</p>
            <FileSymlinkIcon className="size-[15px] stroke-[1.5px]" />
          </Button>
          <Button className="h-[32px] rounded border-[0.33px] border-paper bg-paper text-dyan/50 transition-all duration-300 hover:border-dyan hover:text-dyan hover:shadow-sm">
            <SettingsIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="">
        <div className="flex h-[56px] rounded bg-gradient-to-br from-paper from-30% to-white p-2 text-sm text-dyan/70">
          {product?.description}
        </div>
      </div>

      <div className="h-[520px] space-y-6 overflow-scroll pr-4 text-xs text-dyan">
        <div className="grid grid-cols-1 gap-x-2 md:grid-cols-8"></div>
        <div className="h-[120px] text-dyan">
          <div className="grid h-full grid-cols-5">
            <Stats label="total revenue" value={0} />
            <Stats label="invoices" value={invoices?.length} />
            <Stats label="sold" value={0} />
            <Stats label="in-stock" value={0} />
            {/* <Stats label="completed" value={0} /> */}
          </div>
        </div>

        <div>
          <Header title="Transaction History" />
          <div className="flex h-[200px] items-center justify-center rounded bg-paper">
            <div className="flex items-center space-x-4 text-dyan/50">
              <p>No records.</p>
              <ArchiveXIcon className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type StatsProps = {
  label: string;
  value: number | string | undefined;
};
const Stats = (props: StatsProps) => (
  <div className="flex flex-col items-start justify-center">
    <div className="flex flex-col items-start justify-center">
      <p className="text-xl font-semibold tracking-tight">{props.value}</p>
      <p className="font-mono text-xs font-light text-dyan/80">{props.label}</p>
    </div>
  </div>
);

// const DetailContainer = tw.div`
//  h-fit space-y-5 rounded-lg border-[0.0px] border-dyan/40 bg-paper p-4
//   `;
