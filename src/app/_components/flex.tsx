"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@@utils/cn";

const flexVariants = cva("items-center justify-center", {
  variants: {
    variant: {
      default: "flex h-full",
      block: "block",
      flex: "flex",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
type FlexVariants = typeof flexVariants;

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<FlexVariants> {
  children?: React.ReactNode;
  between?: boolean;
  around?: boolean;
  evenly?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  spacing?: string;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      around,
      between,
      evenly,
      children,
      className,
      fullWidth,
      fullHeight,
      spacing,
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = "div";

    return (
      <Comp
        className={cn(
          flexVariants({ variant, className }),
          around ? "justify-around" : "",
          between ? "justify-between" : "",
          evenly ? "justify-evenly" : "",
          fullWidth ? "w-full" : "",
          fullHeight ? "h-full" : "",
          spacing ? spacing : "",
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Flex.displayName = "Flex";

export { Flex, flexVariants };

const Block = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      around,
      between,
      evenly,
      children,
      className,
      fullWidth,
      fullHeight,
      spacing,
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = "div";

    return (
      <Comp
        className={cn(
          flexVariants({ variant, className }),
          `flex-col`,
          around ? "justify-around" : "",
          between ? "justify-between" : "",
          evenly ? "justify-evenly" : "",
          fullWidth ? "w-full" : "",
          fullHeight ? "h-full" : "",
          spacing ? spacing : "",
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Block.displayName = "Block";

export { Block };
