"use client";

import { Button } from "@src/app/(ui)/button";
import {
  ArchiveXIcon,
  FileSymlinkIcon,
  LoaderIcon,
  PackageIcon,
  SettingsIcon,
} from "lucide-react";
import { useCallback, useContext, useEffect } from "react";
import { storage } from "@src/lib/db";
import { ref } from "firebase/storage";
import { Header } from "../../(components)/header";
import { PaymentsContext } from "../../(context)/context";
import type {
  CopperxInvoiceResponseDataSchema,
  LineItemResponseSchema,
} from "@src/server/resource/copperx/invoice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getValueAndCurrency } from "../../(context)/currency-list";
import { ImageUploader } from "@src/app/services/(components)/image-uploader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@src/lib/db";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { opts } from "@src/utils/helpers";

export const ProductContent = ({ id }: { id: string }) => {
  const [user] = useAuthState(auth);
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

  const path = `${user?.uid}/payments/products/${product?.id}`;
  const [value, loading] = useDownloadURL(ref(storage, path));

  useEffect(() => {
    if (value) {
      console.log("content img value", value);
    } else {
      console.log(value);
    }
  }, [value]);

  const [unitPrice, currency] = getValueAndCurrency(
    product?.defaultPrice.unitAmount,
    product?.defaultPrice.currency,
  );
  const router = useRouter();

  const handleCreateInvoiceRoute = () => {
    if (product?.id) {
      router.push(`/services/payments/invoices/create/0/${product?.id}`);
    }
  };
  const ImageOptions = useCallback(() => {
    const withValue = value !== undefined;
    const options = opts(
      <Image
        alt="product image"
        src={
          value! ??
          `https://upload.wikimedia.org/wikipedia/commons/d/d4/Currency_sign.svg`
        }
        width={0}
        height={0}
        className="h-[175px] w-auto portrait:h-[64px] portrait:w-[100px]"
        unoptimized
      />,
      <ImageUploader
        filename={product?.id}
        dir="products"
        userId={user?.uid}
      />,
    );
    return <>{options.get(withValue)}</>;
  }, [value, product?.id, user?.uid]);

  const ImageLoading = useCallback(() => {
    const options = opts(
      <LoaderIcon className="size-4 text-dyan/50" />,
      <ImageOptions />,
    );
    return <>{options.get(loading)}</>;
  }, [loading, ImageOptions]);

  return (
    <div className="h-[664px] overflow-y-scroll">
      <div className="flex items-center justify-between portrait:px-2">
        <div className="flex items-center space-x-4 uppercase portrait:space-x-1">
          <PackageIcon className="size-5 stroke-1 text-copper/60 portrait:size-4" />
          <Header title={`${product?.name}`} />
          <p className="font-mono portrait:hidden">{id.substring(0, 13)}</p>
        </div>
        <div className="flex items-center space-x-4 px-4 portrait:space-x-1 portrait:px-0">
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

      <div className="portrait: px-2">
        <div className="flex h-[175px] space-x-4 rounded bg-gradient-to-br from-paper from-30% to-white text-sm text-dyan/70 portrait:h-[56px]">
          <div className="flex w-[175px] cursor-pointer items-center justify-center bg-white shadow-sm portrait:w-[56px]">
            <ImageLoading />
          </div>
          <div className="flex flex-col justify-end py-4 portrait:py-1">
            <p className="text-xs font-medium text-dyan/50 portrait:tracking-tight">
              Product Description
            </p>
            <div className="flex h-[28px] whitespace-nowrap portrait:h-fit portrait:w-[300px] portrait:overflow-x-scroll portrait:font-light">
              {product?.description}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[520px] space-y-6 overflow-scroll pr-4 text-xs text-dyan portrait:space-y-2 portrait:pr-0">
        <div className="h-[150px] text-dyan portrait:h-fit portrait:py-6">
          <div className="grid h-full grid-cols-2 md:grid-cols-5 portrait:gap-y-4">
            <Stats
              label="unit price"
              value={unitPrice}
              imageUrl={
                (currency as string) ??
                `https://upload.wikimedia.org/wikipedia/commons/d/d4/Currency_sign.svg`
              }
            />
            <Stats label="revenue" value={0} />
            <Stats label="invoices" value={invoices?.length} />
            <Stats label="sold" value={0} />
            <Stats label="in-stock" value={0} />
            {/* <Stats label="completed" value={0} /> */}
          </div>
        </div>

        <div>
          <div className="portrait:px-2">
            <Header title="Transaction History" />
          </div>
          <div className="flex h-[200px] w-full items-center justify-center rounded bg-paper portrait:rounded-none">
            <div className="flex items-center space-x-4 text-dyan/50 portrait:space-x-2">
              <p>No records in history.</p>
              <ArchiveXIcon className="size-4 stroke-1" />
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
  imageUrl?: string | undefined;
};
const Stats = (props: StatsProps) => {
  const { label, value, imageUrl } = props;
  const ImageOptions = useCallback(() => {
    const withUrl = imageUrl !== undefined;
    const options = opts(
      <Image
        alt="currency"
        src={`${imageUrl}`}
        width={0}
        height={0}
        className="h-[19px] w-auto portrait:h-[14px]"
      />,
      <></>,
    );
    return <>{options.get(withUrl)}</>;
  }, [imageUrl]);
  return (
    <div className="flex flex-col items-center justify-center portrait:items-start portrait:px-6">
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center space-x-1 portrait:space-x-[1px]">
          <ImageOptions />
          <p className="text-xl font-bold tracking-tighter portrait:text-sm">
            {value}
          </p>
        </div>
        <p className="font-mono text-xs font-light text-dyan/80 portrait:tracking-tighter">
          {label}
        </p>
      </div>
    </div>
  );
};

// const DetailContainer = tw.div`
//  h-fit space-y-5 rounded-lg border-[0.0px] border-dyan/40 bg-paper p-4
//   `;
