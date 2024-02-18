import type { Dispatch, SetStateAction } from "react";
import { onError, onSuccess, onWarn } from "./toast";

export function toggleState(setState: Dispatch<SetStateAction<boolean>>): void {
  setState((prevState) => !prevState);
}

export const limitText = (text: string | number) => {
  if (typeof text === "number") {
    const str = text.toString();
    return str.substring(0, 30);
  }
  if (text.length > 45) {
    return `${text.substring(0, 40)} ...`;
  }
  return text.substring(0, 45);
};

type CopyFnParams = {
  name: string;
  text: string;
};
type CopyFn = (params: CopyFnParams) => Promise<boolean>; // Return success

export const copyFn: CopyFn = async ({ name, text }) => {
  if (!navigator?.clipboard) {
    onWarn("Clipboard not supported");
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    onSuccess(`${name ? "Copied: " + name : "Copied."}`, limitText(text));
    return true;
  } catch (error) {
    onError("Copy failed.");
    return false;
  }
};

export const decimal = (
  num: string | number | undefined,
  digits: number,
): string => {
  if (num === undefined) return "0.00";
  const parsedNumber = typeof num === "string" ? parseFloat(num) : num;
  return parsedNumber.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};
