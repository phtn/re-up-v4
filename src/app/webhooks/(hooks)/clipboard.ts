import { copyFn } from "@src/utils/helpers";

/**
 * @name useClipboard
 */
export const useClipboard = () => {
  const copy =
    (...args: Array<string | undefined>) =>
    async () => {
      await copyFn({ specie: args[0], text: args[1] });
    };

  return { copy };
};
