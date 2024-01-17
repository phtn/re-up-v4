import { toast } from "sonner";

export const onSuccess = (...args: string[]) =>
  toast(args[0], {
    description: args[1],
  });
