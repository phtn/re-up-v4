import type { Dispatch, ReactElement, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { onError, onSuccess, onWarn } from "./toast";

export function toggleState(setState: Dispatch<SetStateAction<boolean>>): void {
  setState((prevState) => !prevState);
}

export const opts = (...args: ReactElement[]) => {
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};

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

export const jsoq = (value: string) => {
  const bowen = "\u2318"; // bowen
  const pi = "\u0960"; // pi

  const replacedDashes = value.replace(/-/g, bowen);
  const replacedHttps = replacedDashes.replace(/https:\/\//g, pi);
  const removedSpaces = replacedHttps.replace(/\s*([\w-]+)\s*:/g, '"$1":');

  const replacedQuotes = removedSpaces.replace(
    /:\s*([^,"{}\s][^,"{}]*)/g,
    ': "$1"',
  );

  const replacedBowen = replacedQuotes.replaceAll(bowen, "-");
  const replacedPi = replacedBowen.replaceAll(pi, "https://");

  return replacedPi;
};

export const createWebhookId = (): string => {
  const regex = /-(.*)-/;
  const uid = uuidv4();

  const match = uid.match(regex);
  if (match && match.length > 1) {
    const stringBetweenDashes = match[1];
    return `APP-${stringBetweenDashes}-x`;
  } else {
    return `APP-${uid.substring(0, 13)}-x`;
  }
};

export const removeLastEqualSign = (str: string) => {
  const regex = /=+$/;
  return str.replace(regex, "");
};

export const hashString = async (...args: string[]): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(args.join(""));

  return crypto.subtle.digest("SHA-256", data).then((hash) => {
    const encoded = btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(hash))),
    );
    const sanitizedHash = encoded
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return removeLastEqualSign(sanitizedHash);
  });
};

export const createWebhookUID = async (
  ...args: Array<string | undefined>
): Promise<string> => {
  if (args.every((arg) => arg !== undefined)) {
    return `uid_${await hashString(...(args as string[]))}_x`;
  } else {
    return `uid_${await hashString(new Date().getTime().toString(36))}x`;
  }
};

export const minifyve = (str: string | undefined) => {
  if (!str) return;
  return str.slice(-5);
};
