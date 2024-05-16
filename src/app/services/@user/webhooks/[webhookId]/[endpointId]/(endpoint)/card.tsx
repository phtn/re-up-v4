import { BitFlip } from "@src/app/(components)/bit-flip";
import { TheTip } from "@src/app/(ui)/just-the-tip";
import { type GetEndpointResponseSchema } from "@src/server/resource/endpoint";
import { cn } from "@src/utils/cn";
import { prettyDate } from "@src/utils/helpers";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import {
  CalendarClockIcon,
  ChevronRightIcon,
  CircuitBoardIcon,
  CloudUploadIcon,
  InfoIcon,
  LoaderIcon,
  MoreHorizontalIcon,
  SquareStackIcon,
  type LucideIcon,
} from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import tw from "tailwind-styled-components";
import { EndpointActivityChart } from "./graph/chart";
import { content } from "./styles";

type CardProps = {
  id: string | undefined;
  tag: string;
  title: string | undefined;
  name: string | undefined;
  extra?: string | undefined;
  description: string | undefined;
  icon: LucideIcon;
  endpoint: GetEndpointResponseSchema | null;
  iconStyle?: string;
  actionIcon: LucideIcon;
  actionIconStyle?: string;
  actionLabel?: string;
  onClick: () => void;
};

/**
 * @name Card
 * @description - custom card component
 * @author - phtn
 */
export const Card = (props: CardProps) => {
  const { tag, title, name, iconStyle, endpoint, onClick } = props;

  return (
    <CardContainer>
      <div className="">
        <div className="flex h-[64px] items-center px-4 md:px-6">
          <Header
            tag={tag}
            title={title}
            value={endpoint?.id}
            icon={props.icon}
            iconStyle={iconStyle}
            onClick={onClick}
          />
        </div>
        <CardList>
          <BlockContent>
            <div className="flex items-center space-x-3">
              <p className="font-jet text-[16px] font-medium text-void">
                {name}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-dyan">
              <div className="flex h-[16px] items-center justify-center">
                <BitFlip
                  state={endpoint?.description}
                  zero={
                    <LoaderIcon className="size-3 animate-spin text-dyan/50" />
                  }
                  one={
                    <InfoIcon className="size-3 fill-cord/60 stroke-[3px] text-dyan/80" />
                  }
                />
              </div>

              <p className="text-xs">{endpoint?.description}</p>
            </div>
          </BlockContent>

          <DFlexContent>
            <CardItem
              iconStyle={endpoint?.disabled ? "text-kindle" : "text-cord"}
              icon={CircuitBoardIcon}
              title="Status"
              description={
                !endpoint
                  ? undefined
                  : endpoint?.disabled
                    ? "Enabled"
                    : "Disabled"
              }
            />
            <CardItem
              icon={SquareStackIcon}
              title="Rate Limit"
              description={endpoint?.rateLimit}
            />
          </DFlexContent>

          <FlexContent>
            <CardItem
              icon={CalendarClockIcon}
              title="Created on"
              description={endpoint?.createdAt}
            />
          </FlexContent>
          <FlexContent>
            <CardItem
              icon={CloudUploadIcon}
              title="Last Updated"
              description={endpoint?.updatedAt}
            />
          </FlexContent>
        </CardList>
        <div className="h-[210px] w-full p-4 text-[14px] font-light text-gray-500">
          <div className="h-full overflow-hidden rounded-lg border border-cord/30">
            <ParentSize className="rounded-none">
              {({ width, height }) => (
                <EndpointActivityChart width={width} height={height} />
              )}
            </ParentSize>
          </div>
        </div>
        <div className="flex h-[54px] w-full items-center justify-center border-t-[0.33px] border-opus/30">
          <p
            className="font-jet text-cord/80"
            onClick={() => {
              toast(
                <div
                  className={cn(
                    content,
                    `m-0 flex h-[72px] w-[300px] flex-1 items-center justify-center font-jet font-bold text-dyan`,
                  )}
                >
                  test complete!
                </div>,
              );
            }}
          >
            test endpoint
          </p>
        </div>
      </div>
    </CardContainer>
  );
};

type HeaderProps = {
  icon: LucideIcon;
  iconStyle?: string;
  tag?: string;
  title: string | undefined;
  value?: string | number | undefined;
  titleStyle?: string;
  onClick?: () => void;
};

/**
 * (endpoint) - Header
 * @author - phtn
 */
export const Header = (props: HeaderProps) => {
  const { title, value, iconStyle, onClick } = props;
  const ValueOptions = useCallback(() => {
    if (!value)
      return (
        <MoreHorizontalIcon className="size-5 animate-pulse text-cord/80" />
      );

    return typeof value === "string" || typeof value === "undefined" ? (
      <TheTip extra={value} tip="copy">
        <p
          className="font-jet text-xs tracking-widest text-cord"
          onClick={onClick}
        >
          {value.slice(-6)}
        </p>
      </TheTip>
    ) : (
      <p className="font-jet text-xs tracking-widest text-cord">{value}</p>
    );
  }, [value, onClick]);

  return (
    <div className="flex w-[240px] items-center space-x-2 md:space-x-3">
      <props.icon className={cn("size-4 text-cord/80", iconStyle)} />
      <p className="font-mono text-[12px] font-semibold text-gray-400 md:text-xs md:uppercase md:tracking-widest">
        {title}
      </p>
      <ChevronRightIcon className="size-4 stroke-[1px] text-cord/50" />
      <div>
        <ValueOptions />
      </div>
    </div>
  );
};

type CardItemProps = {
  icon: LucideIcon;
  iconStyle?: string;
  title: string | undefined;
  description: string | number | Date | undefined;
};
export const CardItem = (props: CardItemProps) => {
  const DescOptions = useCallback(() => {
    if (!props.description)
      return (
        <MoreHorizontalIcon className="size-5 h-[18px] animate-pulse text-dyan" />
      );

    return (
      <p className={cn("font-jet text-[12px] font-light text-dyan")}>
        {props.description instanceof Date
          ? prettyDate(String(props.description))
          : props.description}
      </p>
    );
  }, [props.description]);

  const rand = Math.floor(Math.random() * 5) + 1;
  const delay = delays[rand];
  const duration = durations[rand];
  return (
    <div className="flex min-w-[120px] space-x-2 overflow-hidden">
      <div className="flex size-[40px] items-center justify-center rounded-md border-[1.25px] border-void bg-void text-opus shadow-md">
        <props.icon
          className={cn(
            "size-5 stroke-[1.5px]",
            props.description ? `text-cord` : `text-opus`,
            props.iconStyle,
          )}
        />
      </div>
      <div className="flex h-[40px] flex-col justify-center">
        <p className="font-sand text-sm font-semibold tracking-tighter text-void/80">
          {props.title}
        </p>
        <div
          className={cn(
            `inline-block h-[16px] overflow-hidden transition-all ease-in`,
            delay,
            duration,
            props.description ? `w-full` : `w-5`,
          )}
        >
          <DescOptions />
        </div>
      </div>
    </div>
  );
};

const CardContainer = tw.div`
  overflow-clip bg-void bg-[url('/svg/dots.svg')] bg-contain bg-no-repeat
  border-t-[0.33px] border-opus/30
  `;

const CardList = tw.div`
  rounded-md mx-4
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-700/60 via-orange-50
  `;

const BlockContent = tw.div`
  py-1 px-2 space-y-1 h-[64px] flex flex-col
  items-start justify-center
  overflow-clip
  `;

const DFlexContent = tw.div`
  px-2 flex items-center space-x-6
  overflow-clip h-[64px]
  `;
const FlexContent = tw.div`
  px-2 flex items-center space-x-2
  overflow-clip h-[64px]
  `;

const delays = [`delay-75`, `delay-100`, `delay-150`, `delay-200`, `delay-300`];
const durations = [
  `duration-500`,
  `duration-300`,
  `duration-500`,
  `duration-300`,
  `duration-700`,
];
