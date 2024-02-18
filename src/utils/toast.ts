import { toast } from "sonner";

export const onSuccess = (...args: string[]) => {
  toast.success(args[0], {
    description: args[1],
  });
};

export const onError = (...args: string[]) => {
  toast.error(args[0], {
    description: args[1],
  });
};

export const onInfo = (...args: string[]) => {
  toast.info(args[0], {
    description: args[1],
  });
};

export const onWarn = (...args: string[]) => {
  toast.warning(args[0], {
    description: args[1],
  });
};

