import { copyFn } from "@src/utils/helpers";

export const useCustomerSettings = () => {
  const handleCopyInfo =
    (label: string, text: string | undefined) => async () => {
      if (text) {
        await copyFn({ specie: "success", text, label });
      }
    };

  return { handleCopyInfo };
};
