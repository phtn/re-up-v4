import { type SelectOptionType } from "@src/app/services/(components)/select-options";
import { type CurrencySchema } from "@src/server/resource/copperx/common";
import { type CopperxCustomerDataSchema } from "@src/server/resource/copperx/customer";
import { type CopperxInvoiceDataSchema } from "@src/server/resource/copperx/invoice";
import { type CopperxProductDataSchema } from "@src/server/resource/copperx/product";
import { getDecimalAmount } from "../(hooks)/helpers";

export const transformer = (list: SelectOptionType[] | undefined) => {
  if (list) {
    return list.map((item) => ({
      value: `${item.value}`,
      display: item.url
        ? `${item.label}@${item.complete}@${item.url}`
        : `${item.label}@${item.complete}`,
      disabled: item.disabled,
    }));
  }
};

type ListName = "customers" | "products" | "invoices";
type List<T> = T extends "customers"
  ? CopperxCustomerDataSchema
  : T extends "products"
    ? CopperxProductDataSchema
    : CopperxInvoiceDataSchema;

export const listParser = <T extends ListName>(name: T, list: List<T>[]) => {
  if (name === "customers") {
    return (list as CopperxCustomerDataSchema[]).map((item) => ({
      label: item.name,
      complete: item.organizationName,
      value: item.id,
      disabled: false,
    })) as SelectOptionType[];
  } else if (name === "products") {
    return (list as CopperxProductDataSchema[]).map((item) => ({
      label: item.name,
      complete: item.description,
      value: item.id,
      disabled: false,
    })) as SelectOptionType[];
  } else {
    return (list as CopperxInvoiceDataSchema[]).map((item) => ({
      label: item.dueDate,
      complete: item.description,
      value: item.id,
      disabled: false,
    })) as SelectOptionType[];
  }
};

export const currencyList: SelectOptionType[] = [
  {
    label: "PHP",
    value: "tfi",
    disabled: false,
    complete: "Philippine Peso",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/11/Philippine_peso_in_classic_standard_style.svg",
  },
  {
    label: "USDT",
    value: "usdt",
    disabled: false,
    complete: "Tether USD",
    url: "https://dashboard.copperx.io/assets/usdt.e3754238.svg",
  },
  {
    label: "BTC",
    value: "btc",
    disabled: false,
    complete: "Bitcoin",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Bitcoin-clean.svg",
  },
  {
    label: "ETH",
    value: "eth",
    disabled: false,
    complete: "Ethereum",
    url: "https://dashboard.copperx.io/assets/eth.47b45bb0.svg",
  },
  {
    label: "USDC",
    value: "usdc",
    disabled: false,
    complete: "USD Coin",
    url: "https://dashboard.copperx.io/assets/usdc.9dfea24f.svg",
  },
  {
    label: "BNB",
    value: "bnb",
    disabled: false,
    complete: "BNB Binance Chain Coin",
    url: "https://dashboard.copperx.io/assets/bnb.54da0e7e.svg",
  },
];

export const getCurrency = (currency: CurrencySchema | undefined) => {
  const symbol = currencyList.find((item) => item.value === currency);
  return symbol?.url;
};

export const getValueAndCurrency = (
  value: string | undefined,
  currency: CurrencySchema | undefined,
) => {
  const unitAmount = getDecimalAmount(value);
  const unitPrice =
    typeof unitAmount === "string"
      ? Number(unitAmount).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })
      : unitAmount;

  const symbol = String(getCurrency(currency));
  return [unitPrice, symbol];
};

// BUSD
// url: "https://dashboard.copperx.io/assets/busd.00221d18.svg",
