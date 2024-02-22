import * as React from "react";

import { cn } from "@@utils/cn";
import {
  AtSignIcon,
  BanknoteIcon,
  CoinsIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LockKeyholeIcon,
  type LucideIcon,
  SmartphoneIcon,
  SquareUserIcon,
  UploadCloudIcon,
  UserCircle2Icon,
} from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border border-slate-400 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// MODERN INPUT
//
export type IconName =
  | "user"
  | "name"
  | "file"
  | "reader"
  | "email"
  | "mobile"
  | "money"
  | "tokens"
  | "upload"
  | "password";

interface IconPrefix {
  name: IconName;
  icon: LucideIcon;
}

export const IconPrefixes: IconPrefix[] = [
  { name: "user", icon: UserCircle2Icon },
  { name: "name", icon: SquareUserIcon },
  { name: "file", icon: FileTextIcon },
  { name: "reader", icon: FileSpreadsheetIcon },
  { name: "email", icon: AtSignIcon },
  { name: "mobile", icon: SmartphoneIcon },
  { name: "money", icon: BanknoteIcon },
  { name: "tokens", icon: CoinsIcon },
  { name: "upload", icon: UploadCloudIcon },
  { name: "password", icon: LockKeyholeIcon },
];

export const InputField = React.forwardRef<
  HTMLInputElement,
  InputProps & IconPrefix
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring flex h-14 items-center rounded-xl bg-gradient-to-r from-orange-100/80 via-rose-50/60 via-[30%] to-sky-200/60 to-[90%] px-3 ring-offset-sky-600 focus-within:ring-2 focus-within:ring-offset-1",
        className,
      )}
    >
      <props.icon className="mr-[10px] h-[16px] w-[20px] text-coal" />

      <input
        {...props}
        type={type}
        ref={ref}
        autoFocus={false}
        className="w-full rounded bg-transparent p-1 text-[15px] placeholder:text-void autofill:bg-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputField.displayName = "InputField";

export const InputFieldName = React.forwardRef<
  HTMLInputElement,
  InputProps & Omit<IconPrefix, "name"> & { label: string | undefined }
>(({ className, type, label, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring flex h-16 items-center rounded-xl border-[0.0px] border-ash bg-white pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1 dark:bg-indigo-200/20",
        className,
      )}
    >
      <props.icon
        className="mx-[16px] h-8 w-8 text-clay"
        strokeWidth={1}
        fill="rgba(238, 238, 238, 0.60)"
      />
      <span className="w-64 text-xs font-medium uppercase leading-none text-clay">
        {label}
      </span>

      <input
        {...props}
        type={type}
        ref={ref}
        className="shadow-i-br-lg/80 m-1 w-full rounded-lg border-0 border-ash bg-paper p-3 font-mono text-[15px] uppercase tracking-widest text-zinc-600 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFieldName.displayName = "InputFieldName";

export const InputFile = React.forwardRef<
  HTMLInputElement,
  InputProps & IconPrefix
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring flex h-[300px] flex-col items-center justify-end rounded-lg border border-dashed border-ash bg-white shadow-inner ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1",
        className,
      )}
    >
      <div className="absolute flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <props.icon
            className="mr-[16px] h-[48px] w-[48px] text-clay"
            strokeWidth={1}
          />
          <div className="text-md">
            <p className="max-w-[20ch] text-coal">
              <span className="font-semibold text-coal">Click</span> here to
              select a file or{" "}
              <span className="font-semibold text-coal">drag and drop</span> it
              here.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 pb-2 pt-24">
          <span className="text-xs italic text-clay/80">
            Supported formats:
          </span>

          <span className="py-1 text-[12px] text-clay">JPG, PNG or PDF</span>
        </div>
      </div>

      <input
        {...props}
        type={type}
        ref={ref}
        className="h-[200px] w-full py-3 text-[15px] opacity-0 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFile.displayName = "InputFile";

export { Input };
