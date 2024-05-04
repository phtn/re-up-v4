import { type LucideIcon, Disc3Icon } from "lucide-react";
import { type ReactElement } from "react";
import tw from "tailwind-styled-components";
import { cn } from "@src/utils/cn";

type CardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconStyle?: string;
  actionIcon?: LucideIcon;
  onClick: () => void;
  trigger?: ReactElement;
  loading?: boolean;
};
export const XCard = (props: CardProps) => {
  const { title, iconStyle, description, onClick, loading } = props;
  return (
    <Cape onClick={onClick}>
      <CardContainer>
        <div className="bg-[url('/svg/dots.svg')] bg-cover p-6">
          <div className="flex items-center justify-between">
            {loading ? (
              <Disc3Icon
                strokeWidth={1.5}
                className="animate-spin text-sky-700"
              />
            ) : (
              <props.icon
                size={24}
                strokeWidth={1.5}
                className={cn("text-sky-700", iconStyle)}
              />
            )}
          </div>
          <div className="mt-8 font-sans text-lg font-semibold tracking-tighter text-sky-600">
            {title}
          </div>
          <div className="mb-4 text-[14px] text-sm font-light text-copper">
            {description}
          </div>
          <div className="flex h-[20px] w-full items-end justify-end"></div>
        </div>
      </CardContainer>
    </Cape>
  );
};

const Cape = tw.div`
    bg-void/80 overflow-scroll
    border-[0.33px] border-ash/60
    shadow-md shadow-stone-400
    rounded-lg cursor-pointer
    hover:border-cyan-600 hover:shadow-sm
    transition-all duration-300
    `;
const CardContainer = tw.div`
  overflow-clip xl:pr-[2px]
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-sky-100/80 via-sky-50 to-sky-50 h-full w-full
  `;
