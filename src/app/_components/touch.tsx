import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@@utils/cn";
import { type LucideIcon } from "lucide-react";
import tw from "tailwind-styled-components";

const touchDefaultClass = `
  text-xs font-medium border-[0.33px] cursor-pointer space-x-3
  inline-flex items-center justify-center whitespace-nowrap rounded-[6px] 
  focus-visible:outline-none focus-visible:ring-1  
  focus-visible:ring-ring focus-visible:ring-offset-4
  disabled:pointer-events-none disabled:opacity-70
  transition-all duration-300 ring-offset-background
`;
const defaultClass = `
  bg-white text-coal border-ash/[30%]
  hover:shadow-i-br-li-hv shadow-i-tl-li
  hover:text-sky-600 disabled:hover:text-clay/60
  tracking-tight
`;
const primaryClass = `
  bg-white text-blue-500 border-ash/[30%]
  hover:shadow-i-br-li-hv shadow-i-tl-li
  hover:text-blue-600
`;
const tertiaryClass = `
  bg-white text-cyan-600 border-ash/[30%]
  hover:shadow-i-br-li-hv shadow-i-tl-li
  hover:text-cyan-700
`;
const darkClass = `
  bg-void text-sky-200/70 border border-clay/[50%]
  shadow-i-br-dk-hv pointer-events-auto
  hover:text-sky-200/90 rounded-[6px]
  m-[1px] 
`;
const secondaryClass = `
  bg-blue-600 text-blue-100 border border-blue-300/[80%]
  shadow-i-br-dk-hv pointer-events-auto
  hover:text-white rounded-[6px]
  m-[1.5px]
`;
const destroyClass = `
  bg-white text-red-500/80 border-ash/[30%]
  hover:shadow-i-br-md-hv shadow-i-tl-li
  hover:text-red-500
`;
const ghostClass = `
  text-clay border-0 
  hover:text-blue-500 bg-transparent
`;

const tv = cva(touchDefaultClass, {
  variants: {
    variant: {
      default: defaultClass,
      dark: darkClass,
      destroy: destroyClass,
      primary: primaryClass,
      secondary: secondaryClass,
      tertiary: tertiaryClass,
      ghost: ghostClass,
    },
    size: {
      sm: "h-[32px] px-[14px]",
      md: "h-[44px] px-[18px] text-[12px]",
      lg: "h-[50px] px-[28px] text-[13px]",
      icon: "h-[52px] w-[52px]",
      default: "h-[42px] px-[16px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ReUpButtonProps {
  icon?: LucideIcon;
  tail?: LucideIcon;
}

interface TouchProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tv> {
  asChild?: boolean;
}
export const Touch = forwardRef<
  HTMLButtonElement,
  TouchProps & ReUpButtonProps
>(({ asChild, className, size, variant, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Case
      className={cn(
        variant === "ghost" ? `shadow-0 border-0 bg-transparent` : null,
      )}
    >
      <Comp
        className={cn(tv({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.icon ? <props.icon strokeWidth={1} className="h-4 w-4" /> : null}

        {children ? <div>{children}</div> : null}
        {props.tail ? <props.tail strokeWidth={1} className="h-4 w-4" /> : null}
      </Comp>
    </Case>
  );
});

Touch.displayName = "Touch";

const Case = tw.div`
  flex items-center justify-center bg-white p-[2px]
  rounded-[7.67px] border-[0.33px] border-ash 
  transition-all duration-300 drop-shadow-sm 
  hover:shadow-i-tl-li-hv shadow-i-br-li
  active:scale-[95%] active:border-ash
`;

export const DarkTouch = forwardRef<
  HTMLButtonElement,
  TouchProps & ReUpButtonProps
>(({ asChild, className, size, variant = "dark", children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <DarkCase
      className={cn(
        className,
        variant === "secondary" ? `border-0 bg-blue-200 pt-0` : ``,
        size === "icon" ? `m-[0px] h-[56px] w-[56px] ` : ``,
      )}
    >
      <Comp
        className={cn(
          tv({ variant, size, className }),
          variant === "secondary" ? `h-[38px]` : ``,
          size === "sm" ? `h-[38px]` : ``,
          size === "md" ? `h-[48px] px-[22px] text-[12px]` : ``,
        )}
        ref={ref}
        {...props}
      >
        {props.icon ? <props.icon strokeWidth={1} className="h-4 w-4" /> : null}

        {children ? <div>{children}</div> : null}
        {props.tail ? <props.tail strokeWidth={1} className="h-4 w-4" /> : null}
      </Comp>
    </DarkCase>
  );
});

DarkTouch.displayName = "DarkTouch";

const DarkCase = tw.div`
  flex items-center justify-center bg-void pt-[.75px]
  rounded-[7.5px] border-[0.75px] border-orange-100/[30%]
  shadow-i-tl-dk-hv
  transition-all duration-300 
  drop-shadow-sm
  active:scale-[95%] active:border-ash
`;
