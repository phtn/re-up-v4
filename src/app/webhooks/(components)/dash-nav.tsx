import { Block, Flex } from "@@ui/flex";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { minified, opts } from "@src/utils/helpers";
import {
  CircleIcon,
  DotIcon,
  FileJsonIcon,
  Link2Icon,
  LoaderIcon,
  MessageSquareTextIcon,
  MoreHorizontalIcon,
  WebhookIcon,
} from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import tw from "tailwind-styled-components";
import {
  useEndpointInterface,
  useEventTypeInterface,
  useMessageInterface,
} from "../@premium/[webhookId]/hooks";
import { MoreOptions } from "./more-options";
import { Navbar } from "./navbar";
import { PopOptions } from "./pop-options";
import { cn } from "@src/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useClipboard } from "../(hooks)/clipboard";
import { BitFlip } from "@src/app/(components)/bit-flip";

type PageNavbarProps = {
  data: WebhookDataSchema[] | undefined | null;
  actions: Record<string, () => void>;
};

export const DashboardNavbar = ({ data }: PageNavbarProps) => {
  const [webhook, setWebhook] = useState<WebhookDataSchema | undefined>();
  const [webhookCount, setWebhookCount] = useState<number>(0);

  const { endpointData } = useEndpointInterface({
    webhookId: webhook?.webhook.id,
    endpoints: webhook?.endpoints,
  });

  const { eventTypeData } = useEventTypeInterface(webhook?.webhook.id);
  const { messagesData } = useMessageInterface(webhook?.webhook.id);

  useEffect(() => {
    if (data) {
      setWebhookCount(data.length);
      setWebhook(data[0]);
    }
  }, [data]);

  const TitleOptions = useCallback(() => {
    const overOne = !!webhookCount && webhookCount < 1;
    const options = opts(
      <PrimaryItem label="Webhooks" value={webhookCount} />,
      <SecondaryItem
        label={webhook?.webhook.name}
        value={webhook?.webhook.id}
      />,
    );
    return <>{options.get(overOne)}</>;
  }, [webhook, webhookCount]);

  if (!webhook) return;

  // const { createEnpoint } = actions;
  // const handleCreateEndpoint = () => {
  //   if (createEnpoint) {
  //     createEnpoint();
  //   }
  // }

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Icon>
          <WebhookIcon className="size-5 text-kindle md:size-6" />
        </Navbar.Icon>

        <Flex spacing={`space-x-[8px] md:space-x-[30px] justify-center`}>
          <TitleOptions />
          <VSeparator />
        </Flex>
      </Navbar.Header>

      <Navbar.Items>
        <PopOptions popIcon={Link2Icon} label="Endpoints" data={endpointData}>
          <NavPopTrigger title="Endpoints" value={endpointData.length} />
        </PopOptions>
        <VSeparator />
        <PopOptions
          popIcon={FileJsonIcon}
          label="Event Types"
          data={eventTypeData}
        >
          <NavPopTrigger title="Event Types" value={eventTypeData.length} />
        </PopOptions>
        <VSeparator />
        <PopOptions
          popIcon={MessageSquareTextIcon}
          label="Message Logs"
          data={messagesData}
        >
          <NavPopTrigger title="Logs" value={messagesData.length} />
        </PopOptions>
      </Navbar.Items>

      <Navbar.Extras>
        <VSeparator />
        <ModeItem label="Mode">LIVE</ModeItem>
        <Navbar.Icon>
          <MoreOptions webhookId={webhook.webhook.id} />
        </Navbar.Icon>
      </Navbar.Extras>
    </Navbar>
  );
};

type NavPopTriggerProps = {
  title: string;
  value: string | number;
};
const NavPopTrigger = ({ title, value }: NavPopTriggerProps) => (
  <MenuItem label={title}>
    {value ? (
      value
    ) : (
      <LoaderIcon className="size-4 animate-spin text-cord/70" />
    )}
  </MenuItem>
);

type ItemProps = {
  label: string | undefined;
  value: string | number | undefined;
};

const PrimaryItem = ({ label, value }: ItemProps) => (
  <Navbar.Title>
    <Flex className="md:h-[36px]">
      <PrimaryTitle>{label ?? ""}</PrimaryTitle>
      <DotIcon className="text-[#83D2CE]" size={16} />
    </Flex>
    <ItemCount>{value ?? ""}</ItemCount>
  </Navbar.Title>
);

const SecondaryItem = ({ label, value }: ItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { copy } = useClipboard();
  const path = `/webhooks/${value}`;

  const handleClick = useCallback(() => {
    console.log("handleClick", value);
    router.push(path);
  }, [value, router, path]);

  const IdOptions = useCallback(() => {
    if (!value)
      return (
        <MoreHorizontalIcon className="size-4 animate-pulse text-cord/50" />
      );

    return (
      <ItemSubtext onClick={handleClick}>
        {minified(value as string)}
      </ItemSubtext>
    );
  }, [value, handleClick]);

  const CopyItem = useCallback(() => {
    const handleCopy = () => {
      console.log("handleCopy", value);
      copy("webhook id", `${value}`);
    };
    return (
      <ItemSubtext onClick={handleCopy}>
        {minified(value as string)}
      </ItemSubtext>
    );
  }, [value, copy]);

  return (
    <Navbar.Title>
      <Flex className="h-fit space-x-2">
        <WebhookLabel>{label ?? ""}</WebhookLabel>
        <CircleIcon className={cn("size-3", `fill-emerald-400`)} />
      </Flex>
      <BitFlip
        state={path === pathname}
        zero={<IdOptions />}
        one={<CopyItem />}
      />
    </Navbar.Title>
  );
};

type SubItem = string | number | ReactElement | ReactNode;

interface MenuItemProps {
  label: string;
  children: SubItem;
}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, label }: MenuItemProps, ref) => {
    return (
      <Block ref={ref} spacing="space-y-2 w-[56px] sm:w-[72px] md:w-[100px]">
        <ItemTitle>{label}</ItemTitle>
        <ItemCount>{children}</ItemCount>
      </Block>
    );
  },
);
MenuItem.displayName = "MenuItem";

const ModeItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, label }: MenuItemProps, ref) => {
    return (
      <Block ref={ref} spacing="space-y-2 w-[56px] sm:w-[72px] md:w-[100px]">
        <ItemTitle>{label}</ItemTitle>
        <ModeValue>{children}</ModeValue>
      </Block>
    );
  },
);
ModeItem.displayName = "ModeItem";

const VSeparator = () => (
  <div className="flex h-[72px] items-center justify-center">
    <div className="h-[24px] border-r-[0.33px] border-dashed border-opus/50"></div>
  </div>
);

const PrimaryTitle = tw.h2`
 text-cord font-medium
`;

const WebhookLabel = tw.h2`
 text-cord font-k2d text-[14px] md:text-[16px] font-bold tracking-wide
`;

// text-gray-400 md:text-[12px] text-[10px] md:font-bold tracking-wide font-jet
const ItemTitle = tw.h2`
  text-gray-400 md:text-[13px] text-[12px] font-semibold md:font-bold tracking-tighter font-sans
`;
const ItemSubtext = tw.span`
  text-opus font-jet font-thin md:text-[12px] text-[10px] tracking-widest
  cursor-pointer hover:text-ash hover:underline decoration-dotted underline-offset-2
`;
const ItemCount = tw.span`
  text-cord text-[14px] md:text-[16px] font-jet font-thin
`;
const ModeValue = tw.span`
  text-cord text-[12px] md:text-[12px] font-k2d font-bold uppercase
`;
