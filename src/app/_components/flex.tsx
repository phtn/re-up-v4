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

/**
 * FlexProps is an interface that extends the HTMLAttributes interface.
 * It has a number of props that allow you to control the layout of the children.
 * It also has a number of variants that allow you to control the display of the flex container.
 * @typedef {object} FlexProps
 * @property {React.ReactNode} children - The children of the flex container.
 * @property {boolean} around - If true, the children will be spaced around the container.
 * @property {boolean} between - If true, the children will be spaced between the container.
 * @property {boolean} evenly - If true, the children will be spaced evenly in the container.
 * @property {boolean} fullWidth - If true, the container will take up the full width of its parent.
 * @property {boolean} fullHeight - If true, the container will take up the full height of its parent.
 * @property {string} spacing - The spacing between the children.
 * @property {FlexVariants} variant - The variant of the flex container.
 */

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

/**
 * @name Flex layout component that align items in a row.
 * @default items-center justify-center
 * @param {FlexProps} props
 * @returns {React.ReactElement}
 */

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
