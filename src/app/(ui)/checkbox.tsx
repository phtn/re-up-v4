"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@src/utils/cn";

/**
 * (ui) - Checkbox
 *
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "focus-visible:ring-ring peer h-4 w-4 shrink-0 rounded-md border border-ash shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-void data-[state=checked]:text-cyan-500 data-[state=checked]:animate-in data-[state=unchecked]:animate-out data-[state=checked]:zoom-in-100 data-[state=unchecked]:zoom-out-0",
      className,
    )}
    {...props}
  ></CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
