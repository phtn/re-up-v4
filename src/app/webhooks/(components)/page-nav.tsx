import { CheckCircle2Icon, DotIcon, WebhookIcon } from "lucide-react";
import { Block, Flex } from "@@components/flex";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import { minified, opts } from "@src/utils/helpers";
import {
  useEffect,
  useState,
  useCallback,
  type ReactNode,
  type ReactElement,
  forwardRef,
} from "react";
import tw from "tailwind-styled-components";
import { Navbar } from "./navbar";
import { MoreOptions } from "./more-options";

type PageNavbarProps = {
  data: WebhookDataSchema[] | undefined | null;
  actions: Record<string, () => void>;
};

export const PageNavbar = ({ data }: PageNavbarProps) => {
  const [webhook, setWebhook] = useState<WebhookDataSchema | undefined>();
  const [webhookCount, setWebhookCount] = useState<number>(0);

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
        value={minified(webhook?.webhook.id)}
      />,
    );
    return <>{options.get(overOne)}</>;
  }, [webhook, webhookCount]);

  // const { createEnpoint } = actions;
  // const handleCreateEndpoint = () => {
  //   if (createEnpoint) {
  //     createEnpoint();
  //   }
  // };

  if (!webhook) return;

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Icon>
          <WebhookIcon size={24} className="text-kindle" />
        </Navbar.Icon>

        <Flex spacing={`space-x-[30px] justify-center`}>
          <TitleOptions />
          <VSeparator />
          <MenuItem label="Activity">13</MenuItem>
        </Flex>
      </Navbar.Header>

      <Navbar.Items>
        <MenuItem label="Endpoints">{webhook.endpoints?.length ?? 0}</MenuItem>
        <VSeparator />
        <MenuItem label="Events">0</MenuItem>
      </Navbar.Items>

      <Navbar.Extras>
        <MenuItem label="Logs">0</MenuItem>
        <VSeparator />
        <MenuItem label="Mode">
          <span className="mb-[32px] font-k2d text-xs font-bold uppercase">
            Prod
          </span>
        </MenuItem>

        {/* <Touch
          size="sm"
          variant={"ghost"}
          className="text-cord bg-transparent text-[12px] font-medium"
          onClick={handleCreateEndpoint}
        >
          Testing
        </Touch>
        <Flex spacing={`space-x-[24px]`}>
          <p className="text-gray-700"> | </p>
        </Flex> */}
        <Navbar.Icon>
          <MoreOptions />
        </Navbar.Icon>
      </Navbar.Extras>
    </Navbar>
  );
};

type ItemProps = {
  label: string | undefined;
  value: string | number | undefined;
};
const PrimaryItem = ({ label, value }: ItemProps) => (
  <Navbar.Title>
    <Flex className="h-[36px]">
      <PrimaryTitle>{label ?? ""}</PrimaryTitle>
      <DotIcon className="text-[#83D2CE]" size={16} />
    </Flex>
    <ItemCount>{value ?? ""}</ItemCount>
  </Navbar.Title>
);
const SecondaryItem = ({ label, value }: ItemProps) => (
  <Navbar.Title>
    <Flex className="h-full items-center space-x-1">
      <WebhookLabel>{label ?? ""}</WebhookLabel>
      <CheckCircle2Icon fill="#34d399" size={10} className="mt-1" />
    </Flex>
    <ItemSubtext>{value ?? ""}</ItemSubtext>
  </Navbar.Title>
);

type SubItem = string | number | ReactElement | ReactNode;
interface MenuItemProps {
  label: string;
  children: SubItem;
}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, label }: MenuItemProps, ref) => {
    return (
      <Block ref={ref} className="items-center" spacing=" space-y-1">
        <ItemTitle>{label}</ItemTitle>
        <ItemCount>{children}</ItemCount>
      </Block>
    );
  },
);

MenuItem.displayName = "MenuItem";

// const classifier = (subItem: SubItem) => {
//   switch (subItem) {
//     case "string":
//       return <ItemSubtext>{subItem}</ItemSubtext>;
//     case "number":
//       return <ItemCount>{subItem}</ItemCount>;
//     default:
//       return subItem;
//   }
// };

const PrimaryTitle = tw.h2`
 text-cord font-medium
`;

const WebhookLabel = tw.h2`
 text-cord font-k2d font-bold tracking-wide
`;
const ItemTitle = tw.h2`
  text-cyan-200/70 text-[12px] font-extrabold tracking-wide font-jet
`;

const ItemSubtext = tw.span`
  text-opus font-jet font-thin text-[12px] tracking-widest
`;
const ItemCount = tw.span`
  text-cord font-jet text-lg font-thin
`;

const VSeparator = () => (
  <div className="flex h-[72px] items-center justify-center">
    <div className="h-[24px] border-r-[0.33px] border-dashed border-opus/50"></div>
  </div>
);
