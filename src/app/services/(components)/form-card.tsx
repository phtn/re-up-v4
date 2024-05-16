import { type LucideIcon, Disc3Icon } from "lucide-react";
import { useCallback, type ReactElement, type ReactNode } from "react";
import tw from "tailwind-styled-components";
import { cn } from "@src/utils/cn";

type CardProps = {
  title?: string;
  description?: string;
  extra?: string | ReactElement;
  icon: LucideIcon;
  iconStyle?: string;
  actionIcon?: LucideIcon;
  onClick?: () => void;
  loading?: boolean;
  children?: ReactNode;
  route: string;
};

const customerCardStyle = `from-sky-100/90 via-sky-50/95 to-sky-50 h-full w-full`;
// const productCardStyle = `from-blue-100/90 via-pink-100/90 to-sky-50 h-full w-full`;
const invoiceCardStyle = `from-indigo-100/90 via-rose-100 to-sky-50 h-full w-full`;
const defaultCardStyle = `from-cyan-50/90 via-slate-100 to-sky-50 h-full w-full`;
const greyCardStyle = `from-slate-100/90 via-gray-100 to-sky-50 h-full w-full`;
const pinkCardStyle = `from-teal-100 via-blue-100/90 to-sky-50 h-full w-full`;

export const FormCard = (props: CardProps) => {
  const { title, extra, iconStyle, onClick, loading, children, route } = props;

  const themeSelector = useCallback(() => {
    if (route === "products") {
      return pinkCardStyle;
    } else if (route === "invoices") {
      return invoiceCardStyle;
    } else if (route === "customers") {
      return customerCardStyle;
    } else if (route === "grey") {
      return greyCardStyle;
    } else {
      return defaultCardStyle;
    }
  }, [route]);

  return (
    <Cape onClick={onClick}>
      <CardContainer className={themeSelector()}>
        <div className="space-y-4 p-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-3">
              {loading ? (
                <Disc3Icon
                  strokeWidth={1.5}
                  className="animate-spin text-sky-700"
                />
              ) : (
                <props.icon
                  size={18}
                  strokeWidth={1.5}
                  className={cn("text-dyan", iconStyle)}
                />
              )}
              <div className="font-sans text-[17px] font-semibold tracking-tighter text-copper">
                {title}
              </div>
            </div>
            <div className="font-dyan flex font-mono text-[10px]">{extra}</div>
          </div>
          <div className="">{children}</div>
          {/* <div className="mt-8 font-sans text-lg font-semibold tracking-tighter text-sky-600">
            {title}
          </div>
          <div className="mb-4 text-[14px] text-sm font-light text-copper">
            {description}
          </div>
          <div className="flex h-[20px] w-full items-end justify-end"></div> */}
        </div>
      </CardContainer>
    </Cape>
  );
};

export const GrayCard = ({ children }: { children: ReactNode }) => (
  <Cape>
    <CardContainer className={defaultCardStyle}>{children}</CardContainer>
  </Cape>
);

export const GreyCard = ({ children }: { children: ReactNode }) => (
  <Cape>
    <CardContainer className={greyCardStyle}>{children}</CardContainer>
  </Cape>
);

const Cape = tw.div`
    bg-void/80 overflow-scroll
    shadow-sm shadow-slate-300
    rounded-lg
    transition-all duration-300
    `;

const CardContainer = tw.div`
  overflow-clip xl:pr-[2px]
  rounded-lg
  border-clay/50 border-[0.33px]
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]

  `;
