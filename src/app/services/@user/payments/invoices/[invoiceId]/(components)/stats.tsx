import Image from "next/image";
import { Subtext, Widget } from "./styles";
import Link from "next/link";
import { type ReactNode, useCallback } from "react";
import { opts } from "@src/utils/helpers";

type StatProps = {
  label: string;
  value: string | number | undefined;
  extra?: string;
  children?: ReactNode;
};
export const Stat = ({ label, value, extra, children }: StatProps) => {
  const MoneyValue = useCallback(() => {
    const withExtra = typeof extra === "string";
    const options = opts(
      <>
        {extra ? (
          <Image
            alt="currency"
            src={extra ?? "https://github.com/phtn"}
            width={0}
            height={0}
            className="h-4 w-auto"
            blurDataURL="https://github.com/phtn"
          />
        ) : (
          <div />
        )}
      </>,
      <div />,
    );
    return <>{options.get(withExtra)}</>;
  }, [extra]);

  const HyperValueOptions = useCallback(() => {
    const isCustomer = label === "customer";
    const customer =
      typeof value === "string" ? value?.split("@") : [value, null];
    const options = opts(
      <Link href={`/services/payments/customers/${customer[1]}`}>
        <p className="font-sans text-sm font-bold tracking-tight text-dyan hover:text-sky-600">
          {customer[0]}
        </p>
      </Link>,
      <p className="font-sans text-sm font-bold tracking-tight text-dyan">
        {value}
      </p>,
    );
    return <>{options.get(isCustomer)}</>;
  }, [label, value]);

  return (
    <Widget>
      <div className="text-right">
        <div className="flex items-center space-x-[2px]">
          <MoneyValue />
          <HyperValueOptions />
          {children}
        </div>
        <Subtext>{label}</Subtext>
      </div>
    </Widget>
  );
};
