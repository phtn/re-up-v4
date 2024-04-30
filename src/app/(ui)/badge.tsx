import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@src/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",

        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const statusVariants = cva(
  "inline-flex items-center rounded-md border border-[0.33px] px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        succeeded:
          "border-emerald-600/10 border-double border-[0.33px] bg-emerald-100/50 text-teal-700",
        failed: "border-rose-300/10 bg-rose-50 text-rose-700",
        pending: "border-yellow-300 bg-yellow-100 text-yellow-500",
        sending: "border-blue-300 bg-blue-100 text-blue-500",
      },
    },
    defaultVariants: {
      variant: "succeeded",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {}

function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusVariants({ variant }), className)} {...props} />
  );
}

export { Badge, StatusBadge, badgeVariants, statusVariants };
