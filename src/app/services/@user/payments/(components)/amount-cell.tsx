import { type CurrencySchema } from "@src/server/resource/copperx/common";
import { useCallback, useContext, useState } from "react";
import { PaymentsContext } from "../(context)/context";
import { getValueAndCurrency } from "../(context)/currency-list";
import Image from "next/image";
import { currencyFormat, opts, toggleState } from "@src/utils/helpers";
import { Button } from "@src/app/(ui)/button";
import { RepeatIcon } from "lucide-react";

export type AmountCellProps = {
  total: string | undefined;
  currency: CurrencySchema | undefined;
};
export const AmountCell = (props: AmountCellProps) => {
  const [view, setView] = useState(true);

  const toggleView = () => toggleState(setView);

  const { total, currency } = props;
  const ctx = useContext(PaymentsContext);
  const usd = ctx?.usd;
  const php = ctx?.php;

  const [totalAmount, symbol] = getValueAndCurrency(total, currency);

  const cryptoAsset = usd?.find(
    (item) => item.symbol === currency?.toUpperCase(),
  );
  const usdtAsset = php?.find((item) => item.symbol === "USDT");

  const usdt = usdtAsset?.quote?.[2803]?.price;
  const q = cryptoAsset?.quote?.[2781] ?? { price: 0 };

  //

  const PHPView = useCallback(
    ({ currency }: { currency: CurrencySchema | undefined }) => {
      const getPHPValue = (
        total: string | undefined,
        price: number | null | undefined,
      ) => {
        if (!total) return 0;
        return Number(total) * Number(price) * Number(usdt);
      };
      const isPHP = currency === "tfi";
      const options = opts(
        <div />,
        <p className="flex items-center font-mono text-blue-900/80">
          {currencyFormat(getPHPValue(total, q?.price), "PHP")}
        </p>,
      );
      return <>{options.get(isPHP)}</>;
    },
    [q?.price, total, usdt],
  );

  //

  const ViewOptions = useCallback(() => {
    const getUSDValue = (
      total: string | undefined,
      price: number | null | undefined,
    ) => {
      if (!total) return 0;
      if (!price) {
        return Number(total) / Number(usdt);
      } else {
        return Number(total) * Number(price);
      }
    };
    const options = opts(
      <p className="font-mono text-green-900/80">
        {currencyFormat(getUSDValue(total, q?.price), "USD")}
      </p>,
      <PHPView currency={currency} />,
    );
    return <>{options.get(view)}</>;
  }, [view, PHPView, q?.price, total, usdt, currency]);

  //

  return (
    <div className="space-y-1">
      <div className="flex w-[200px] items-center justify-end">
        {symbol ? (
          <Image
            alt="currency"
            src={symbol}
            width={0}
            height={0}
            className="h-[14px] w-auto px-1"
            quality={100}
          />
        ) : null}
        <p className="font-sans text-[16px] font-medium">{totalAmount}</p>
      </div>
      <div className="flex w-[200px] items-center justify-end space-x-2 text-[10px]">
        <ViewOptions />
        <Button
          size={"sm"}
          variant={"ghost"}
          disabled={currency === "tfi"}
          className="h-[18px] rounded-full p-1 hover:bg-neutral-300/20 hover:text-sky-900 disabled:opacity-20"
          onClick={toggleView}
        >
          <RepeatIcon className="size-3 -rotate-12 stroke-[2.5px] text-sky-800/80" />
        </Button>
      </div>
    </div>
  );
};
