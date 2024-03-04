import type { Dispatch, SetStateAction } from "react";
import { onError } from "./toast";

/**
 * @name Err
 * location: \@src/app/utils/results.ts
 */
export const Err = (
  err: Error,
  message?: string,
  setState?: Dispatch<SetStateAction<boolean>>,
) => {
  onError(message ?? "Error", err.message);
  setState && setState(false);
  return [0, err];
};

/**
 * @name Result
 * location: \@src/app/utils/results.ts
 */
export const Ok = () => {
  return [1, "success"];
};
