import { type LineItemResponseSchema } from "@src/server/resource/copperx/invoice";
import { cn } from "@src/utils/cn";
import { getDecimalAmount } from "../../../(hooks)/helpers";
import { Title } from "./styles";
import Link from "next/link";

export const ItemDetails = ({ items, label }: LineItemProps) => {
  return (
    <div className="">
      <Title text="Item Details" />
      <div className="min-h-[130px] rounded border-[0.33px] border-dyan/20 bg-ghost px-2 py-4 shadow-sm">
        <div className="grid h-6 w-full grid-cols-10 px-2 text-xs font-medium tracking-tight text-dyan">
          <div className="col-span-5">Product</div>
          <div className="col-span-1 flex justify-center">Qty</div>
          <div className="col-span-2 flex justify-end">Unit Price</div>
          <div className="col-span-2 flex justify-end">Total</div>
        </div>
        <div className="border-b border-dashed border-dyan/40" />
        <div className="overflow-y-scroll rounded-[6px] border-[0px] border-clay/50 bg-zap/80">
          <LineItem items={items} label={label} />
        </div>
        <div className="border-b-2 border-dashed border-dyan/10" />
      </div>
    </div>
  );
};

type LineItemProps = {
  items: LineItemResponseSchema[] | undefined;
  label?: string;
};
const LineItem = (props: LineItemProps) => {
  const { items } = props;
  if (!items) return;

  return (
    <>
      {items?.map((item, i) => (
        <div
          key={i}
          className={cn(
            "flex h-16 items-center border-clay/50 px-2 text-xs text-dyan portrait:font-normal",
            i !== items.length - 1 ? "border-b-[0.33px]" : "border-0",
          )}
        >
          <div className="grid w-full grid-cols-10">
            <div className="col-span-5 flex flex-col space-y-1 overflow-x-scroll whitespace-nowrap">
              <Link
                href={`/services/payments/products/${item.price?.productId}`}
              >
                <p className="text-[16px] font-semibold tracking-tight text-dyan hover:text-sky-600">
                  {item.price?.product?.name}
                </p>
              </Link>
              <p className="text-dyan/70">{item.price?.product?.description}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center font-mono text-sm font-medium portrait:font-normal">
              {item.quantity}
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-1 uppercase">
              <div className="flex items-center space-x-1 font-medium tracking-tighter portrait:font-normal">
                <p className="text-sm">
                  {getDecimalAmount(String(item.price?.unitAmount))}
                </p>
                <p className="font-mono text-sm text-sky-600 portrait:hidden">
                  {item.price?.currency === "tfi"
                    ? "php"
                    : item.price?.currency}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-1 uppercase">
              <div className="flex items-center space-x-1 font-medium tracking-tighter portrait:font-normal">
                <p className="font-sans text-sm">
                  {getDecimalAmount(
                    String(+item.price?.unitAmount * item.quantity),
                  )}
                </p>
                <p className="font-mono text-sm text-sky-600 portrait:hidden">
                  {item.price?.currency === "tfi"
                    ? "php"
                    : item.price?.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
