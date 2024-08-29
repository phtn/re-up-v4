"use client";

import {
  BotMessageSquare,
  CheckCircle,
  CircleAlert,
  CircleDashed,
  InfoIcon,
  Loader,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import tw from "tailwind-styled-components";
import { toast } from "sonner";
import { cn } from "@src/utils/cn";

interface Action {
  label?: string | null | undefined;
  onClick: () => void;
  icon?: LucideIcon;
  actionStyle?: string;
  actionMode?: "dark" | "light";
}

interface ReupToastProps {
  title?: string;
  description?: string;
  specie?: string;
  action?: Action;
  style?: string;
  icon?: LucideIcon;
  iconStyle?: string;
}

/**
 * https://re-up.ph
 *
 * @name -> RuphToast
 * @description RuphToast is a custom toast styled component.
 *
 * @param title - The title of the toast message.
 * @param description - The description of the toast message.
 * @param action - The action that the user can take when the toast is displayed.
 * @param style - The style of the toast message.
 * @param icon - The icon that is displayed on the toast message.
 * @param iconStyle - The style of the icon that is displayed on the toast message.
 *
 * @author - phtn
 *
 * @example - toast(RuphToast)
 *
 */
export const ReupToast = (props: ReupToastProps) => {
  const { title, description, specie, action, style, iconStyle } = props;
  return (
    <Base>
      <Container className={cn(style)}>
        <Dots>
          <IconContainer>
            {props.icon ? (
              <props.icon className={cn(baseStyle, iconStyle)} />
            ) : null}
          </IconContainer>
          <TextContainer>
            <HeaderContainer>
              <Specie>{specie}</Specie>
              <Title>{title}</Title>
            </HeaderContainer>
            <Description>{description}</Description>
          </TextContainer>
          {action && (
            <ActionContainer>
              <button
                onClick={action.onClick}
                className={cn(action.actionStyle)}
              >
                {action.label}
              </button>
            </ActionContainer>
          )}
        </Dots>
      </Container>
    </Base>
  );
};

const Base = tw.div`
  bg-coal rounded-md overflow-clip
  border-[0.33px] border-opus/50
  shadow-lg
  `;
const Dots = tw.div`
  bg-[url('/svg/dots.svg')] bg-contain bg-right-top bg-no-repeat
  lg:w-[350px] h-[94px] px-2 flex items-center space-x-2
  `;
const Container = tw.div`
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-50/80 via-gray-50 to-orange-50
  `;
const IconContainer = tw.div`
  w-[24px] h-[60px] flex items-start justify-center
  `;
const baseStyle = `
  stroke-[1.5px] size-[18px] text-coal
  `;
const TextContainer = tw.div`
  flex-1 flex-col h-[64px] space-y-2
  `;
const HeaderContainer = tw.div`
  flex items-center space-x-4
  `;
const Title = tw.div`
  text-void/90 font-medium font-sans text-sm tracking-tighter
  `;
const Specie = tw.div`
  font-mono text-[10px]
  tracking-widest uppercase rounded-md py-1 px-2
  text-cord bg-void
  `;
const Description = tw.div`
  text-dyan font-jet text-[11px] font-light
  `;
const ActionContainer = tw.div`
  w-[72px] h-full flex items-start justify-center
  `;

type ReupToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default"
  | "indeterminate"
  | "determinate";

const icons = {
  success: CheckCircle,
  error: TriangleAlert,
  warning: CircleAlert,
  info: InfoIcon,
  default: BotMessageSquare,
  indeterminate: Loader,
  determinate: CircleDashed,
};

const iconStyles = {
  success: `fill-emerald-500/30`,
  error: `fill-rose-500/30`,
  warning: `fill-amber-500/30`,
  info: `fill-sky-500/30`,
  default: `fill-cyan-500/30`,
  indeterminate: `animate-spin fill-orange-500/30`,
  determinate: `fill-teal-500/30`,
};

/**
 * https://re-up.ph
 *
 * @name -> toaster
 * @description toaster is a custom toast function.
 *
 * @param title - The title of the toast message.
 * @param description - The description of the toast message.
 * @param type - The type of the toast message.
 *
 * @example - toaster("Title", "Description", "success")
 *
 */
export const toaster = (...args: string[]) => {
  const [title, description, specie] = args;
  const icon = icons[specie as ReupToastType];
  const iconStyle = iconStyles[specie as ReupToastType];

  const props = { title, description, icon, iconStyle, specie };
  return toast(<ReupToast {...props} />);
};

export type SigninToast = {
  title?: string | undefined;
  description?: string | undefined;
  specie?: string;
  type?: string | undefined;
  duration?: number;
  b: boolean;
};

// const flipstr = (s: boolean, z: string, o: string): string => (s ? o : z);

export const loadster = ({ b }: SigninToast) => {
  const icon = b ? icons.success : icons.indeterminate;
  const iconStyle = b ? iconStyles.success : iconStyles.indeterminate;

  const props = {
    title: b ? "Sign in successful!" : "Signing in...",
    description: b ? "Home sweet home!" : "We're glad you're back!",
    icon,
    iconStyle,
    specie: "Auth",
  };
  return toast(<ReupToast {...props} />, {
    duration: 5000,
  });
};
