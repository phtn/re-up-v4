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
  BuildingIcon,
  MapPinnedIcon,
  FlagIcon,
} from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * @name Input
 * @location \@src/app/_components
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "focus-visible:ring-ring flex h-10 w-full rounded-md border border-gray-500 px-3 py-2 text-xs ring-cord/80 ring-offset-void transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:focus-visible:ring-2 md:focus-visible:ring-offset-2",
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
  | "phone"
  | "money"
  | "tokens"
  | "upload"
  | "description"
  | "password"
  | "company"
  | "organization"
  | "line1"
  | "line2"
  | "city"
  | "state"
  | "postalCode"
  | "country";

interface IconPrefix {
  name: IconName;
  icon: LucideIcon;
}

export const IconPrefixes: IconPrefix[] = [
  { name: "user", icon: UserCircle2Icon },
  { name: "name", icon: SquareUserIcon },
  { name: "file", icon: FileTextIcon },
  { name: "description", icon: FileTextIcon },
  { name: "reader", icon: FileSpreadsheetIcon },
  { name: "email", icon: AtSignIcon },
  { name: "mobile", icon: SmartphoneIcon },
  { name: "phone", icon: SmartphoneIcon },
  { name: "money", icon: BanknoteIcon },
  { name: "tokens", icon: CoinsIcon },
  { name: "upload", icon: UploadCloudIcon },
  { name: "password", icon: LockKeyholeIcon },
  { name: "company", icon: BuildingIcon },
  { name: "organization", icon: BuildingIcon },
  { name: "line1", icon: MapPinnedIcon },
  { name: "line2", icon: MapPinnedIcon },
  { name: "city", icon: MapPinnedIcon },
  { name: "state", icon: MapPinnedIcon },
  { name: "postalCode", icon: MapPinnedIcon },
  { name: "country", icon: FlagIcon },
];

export type Field = {
  name:
    | "name"
    | "email"
    | "phone"
    | "organization"
    | "line1"
    | "line2"
    | "city"
    | "state"
    | "postalCode"
    | "country";
  alt: IconName;
  icon: LucideIcon;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
};

/**
 * @name InputField
 * @location \@src/app/_components
 */
export const InputField = React.forwardRef<
  HTMLInputElement,
  InputProps & IconPrefix
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring group flex h-14 items-center rounded-lg bg-gradient-to-r from-orange-100/80 via-rose-50/60 via-[30%] to-sky-200/60 to-[90%] px-3 ring-offset-void focus-within:ring-2 focus-within:ring-cord/80 focus-within:ring-offset-2",
        className,
      )}
    >
      <props.icon className="mr-[10px] h-[16px] w-[20px] text-coal group-focus-within:text-zap" />

      <input
        {...props}
        type={type}
        ref={ref}
        className="w-full rounded bg-transparent p-1 text-[14px] placeholder:text-coal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputField.displayName = "InputField";

/**
 * @name InputFieldName
 * @location \@src/app/_components
 */
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

/**
 * @name InputFieldFile
 * @location \@src/app/_components
 */
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

export const InputFieldPayments = React.forwardRef<
  HTMLInputElement,
  InputProps & IconPrefix & { label: string | undefined }
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring flex h-[42px] items-center overflow-clip rounded-[5px] border-[0.33px] border-dyan/15 bg-dyan/5 ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1",
        className,
      )}
    >
      <props.icon
        className="mx-[16px] size-5 text-dyan"
        strokeWidth={1.5}
        fill="rgba(238, 238, 238, 0.50)"
      />
      {/* <span className="w-fit whitespace-nowrap text-xs font-medium leading-none text-clay">
        {label} </span> */}

      <input
        {...props}
        type={type}
        ref={ref}
        className="shadow-i-br-lg/80 ml-1 w-full border-l-[0.33px] border-ash/50 bg-white p-3 text-[14px] text-copper placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFieldPayments.displayName = "InputFieldPayments";

export { Input };
