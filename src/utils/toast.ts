import { type SigninToast, loadster, toaster } from "@src/app/(login)/custom";
import type { User, AuthError } from "firebase/auth";
import { toast } from "sonner";

export const onSuccess = (...args: string[]) => {
  toaster(...args, "success");
};

export const onError = (...args: string[]) => {
  toaster(...args, "error");
};

export const onInfo = (...args: string[]) => {
  toaster(...args, "info");
};

export const onWarn = (...args: string[]) => {
  toaster(...args, "warning");
};

export const onValidationError = (message: string) => {
  toaster(
    `Invalid input on field: ${message}`,
    "Endpoint name can only contain alphanumeric characters, hyphens, underscores, and periods.",
  );
};

type OnPromise<T> = [
  Promise<T>,
  string,
  string,
  string,
  AuthError | Error | undefined,
];

export const signinToast = (params: SigninToast) => {
  loadster(params);
};

export const onPromise = <T>(...args: OnPromise<T>) => {
  toast.promise<T>(args[0], {
    loading: args[1],
    success: (data) => {
      switch (args[2]) {
        case "signout":
          return `You're logged out.`;
        case "signin":
          return signInFn(data);
        default:
          return args[3];
      }
    },
    error: args[4]?.message,
  });
};

export const signInFn = <T>(data: T) => {
  if (data !== null && typeof data === "object" && "user" in data) {
    const user = data.user as User;
    if ((user satisfies User) && "email" in user && user.email !== "") {
      return `Signed in as ${user.email}`;
    }
  }
  return `Sign in successful!`;
};
