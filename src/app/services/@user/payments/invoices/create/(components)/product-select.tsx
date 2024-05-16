import { Button } from "@src/app/(ui)/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@src/app/(ui)/sheet";
import { type CopperxProductDataSchema } from "@src/server/resource/copperx/product";
import {
  ChevronDownIcon,
  LayoutGridIcon,
  LayoutListIcon,
  ListOrderedIcon,
  PackagePlusIcon,
  PlusIcon,
} from "lucide-react";
import tw from "tailwind-styled-components";
import { getDecimalAmount } from "../../../(hooks)/helpers";

type ProductSelectProps = {
  onAddProduct: (id: string) => () => void;
  productList: CopperxProductDataSchema[] | undefined;
};
export const ProductSelect = ({
  onAddProduct,
  productList,
}: ProductSelectProps) => {
  return (
    <Sheet>
      <Trigger>
        <PackagePlusIcon className="size-6 stroke-[1.5px] text-dyan" />
        <div className="text-dyan">
          <p>Add Product</p>
        </div>
        <ChevronDownIcon className="size-4 text-dyan/50" />
      </Trigger>
      <Content>
        <Header>
          <Title>
            <PlusIcon className="" />
            <p className="text-[16px]">New Product</p>
          </Title>
          <div className="grid grid-cols-6 gap-1.5">
            <div className="col-span-3 flex h-10 w-full items-center justify-center rounded-lg border-[0.33px] border-mojo/20 bg-zap/20 text-sm font-medium text-zap">
              All Products{" "}
              <span className="ml-3 rounded-lg bg-slate-700/20 px-2 py-0.5  font-mono text-xs font-light">
                {productList?.length}
              </span>
            </div>
            <div className="flex h-10 w-fit items-center justify-center rounded-lg border-[0.33px] border-mojo/20 bg-ash/20 text-zap">
              <div className="mx-1 my-0.5 flex w-10 items-center justify-center rounded-[6px] bg-black/5 p-2">
                <LayoutGridIcon className="size-4 text-zap" />
              </div>
            </div>
            <div className="flex h-10 items-center justify-center rounded-lg border-[0.33px] border-mojo/20 bg-ash/20 text-zap">
              <LayoutListIcon className="size-4 text-zap" />
            </div>
            <div className="flex h-10 items-center justify-center rounded-lg border-[0.33px] border-mojo/20 bg-ash/20 text-zap">
              <ListOrderedIcon className="size-4 text-zap" />
            </div>
          </div>
        </Header>
        <div className="my-4 h-full space-y-2">
          {productList?.map((item) => (
            <ProductCard
              key={item?.id}
              id={item.id}
              name={item.name}
              description={item.description}
              currency={item.defaultPrice.currency}
              unitAmount={item.defaultPrice.unitAmount}
              onAddProduct={onAddProduct}
            />
          ))}
        </div>
      </Content>
    </Sheet>
  );
};

type ProductCardProps = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  onAddProduct: (id: string) => () => void;
  currency: string | undefined;
  unitAmount: string | undefined;
};
const ProductCard = (props: ProductCardProps) => {
  return (
    <div className="flex h-[130px] w-full flex-col justify-between rounded-[8px] border-[0.33px] border-mojo/30 bg-zap/10 px-3 py-2 shadow-lg shadow-zinc-700/60">
      <div className="flex h-[64px] w-full space-x-3">
        <div className="size-[64px] rounded-md border border-mojo/20 bg-slate-600/10 shadow-lg"></div>
        <div className="flex h-full flex-col justify-center">
          <div className="">
            <p className="text-lg font-medium leading-tight tracking-tight text-zap">
              {props.name}
            </p>
            <p className="font-mono text-xs font-light leading-tight text-slate-200">
              {props.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-[36px] w-full items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex h-full items-center space-x-1">
            <p className="font-mono text-xs uppercase text-mojo">
              {props.currency}
            </p>
            <p className="font-medium text-emerald-200">
              {getDecimalAmount(props.unitAmount)}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <SelectButton
            onClick={props.onAddProduct(props.id!)}
            size="sm"
            variant="default"
          >
            <p className="px-6">Select</p>
          </SelectButton>
        </div>
      </div>
    </div>
  );
};

const Trigger = tw(SheetTrigger)`
  h-16 text-[16px] flex items-center justify-around space-x-3
  rounded-lg border-clay/50 border-[0.33px]
  font-sans font-semibold tracking-tighter text-dyan
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-indigo-500/30 via-teal-100/40 to-sky-50 w-full
  `;

const Content = tw(SheetContent)`
  border-[0.33px] border-dyan/20 border h-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-800 via-zinc-800/60 to-yellow-500 backdrop-blur-2xl
  `;

const Header = tw(SheetHeader)`
  flex flex-col space-y-2
  `;
const Title = tw(SheetTitle)`
  flex items-center space-x-4 h-12 rounded-[6px] w-full
  text-zap bg-teal-500 px-4 text-lg font-medium
  `;

const SelectButton = tw(Button)`
  w-[100px] border-[0.33px] border-zinc-200/40 text-white/90 tracking-tight
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] shadow-lg
  from-slate-700/90 via-slate-950/50 to-sky-50 hover:text-white hover:border-zinc-200/80
  `;
