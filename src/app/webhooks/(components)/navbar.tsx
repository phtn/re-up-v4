import { Block, Flex } from "@src/app/_components/flex";
import { Touch } from "@src/app/_components/touch";
import { PlusIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import tw from "tailwind-styled-components";

interface NavProps {
  children: ReactNode;
}

const NavComponent: FC<NavProps> = ({ children }) => (
  <NavContainer>{children}</NavContainer>
);

const HeaderComponent: FC<NavProps> = ({ children }) => <Flex>{children}</Flex>;

const TitleComponent: FC<NavProps> = ({ children }) => (
  <Block className="items-start" spacing="space-y-[6px]">
    {children}
  </Block>
);

const IconComponent: FC<NavProps> = ({ children }) => (
  <div className="flex w-[72px] items-center justify-center">{children}</div>
);

const SettingsComponent: FC<NavProps> = ({ children }) => (
  <Flex spacing={`space-x-[24px]`}>{children}</Flex>
);

const ItemListComponent: FC<NavProps> = ({ children }) => (
  <Flex spacing={`space-x-[16px]`}>{children}</Flex>
);

const ItemComponent: FC<NavProps> = ({ children }) => (
  <Block className="w-[72px] items-start">{children}</Block>
);

const ActionComponent: FC<NavProps> = ({ children }) => (
  <Touch
    size="sm"
    variant={"ghost"}
    iconClass={`h-[16px] w-[16px]`}
    icon={PlusIcon}
    className="text-cord bg-transparent text-[12px] font-medium"
  >
    {children}
  </Touch>
);

const ExtrasComponent: FC<NavProps> = ({ children }) => (
  <Flex spacing={`space-x-[24px]`}>{children}</Flex>
);

const DividerComponent: FC = () => <Flex spacing={`space-x-[24px]`}>|</Flex>;

type NavbarType = typeof NavComponent & {
  Header: typeof HeaderComponent;
  Title: typeof TitleComponent;
  Icon: typeof IconComponent;
  Settings: typeof SettingsComponent;
  Items: typeof ItemListComponent;
  Item: typeof ItemComponent;
  Action: typeof ActionComponent;
  Extras: typeof ExtrasComponent;
  Divider: typeof DividerComponent;
};

/**
 * @description A simple navbar component
 * @namespace Navbar
 * @components Navbar.Header - A header component
 * @components Navbar.Title - A title component
 * @components Navbar.Icon - An icon component
 * @components Navbar.Settings - A settings component
 * @components Navbar.Items - An items component
 * @components Navbar.Item - An item component
 * @components Navbar.Action - An action component
 * @components Navbar.Divider - A divider component
 * @location /app/webhooks/(components)/navbar
 */
export const Navbar: NavbarType = Object.assign(NavComponent, {
  Header: HeaderComponent,
  Title: TitleComponent,
  Icon: IconComponent,
  Settings: SettingsComponent,
  Items: ItemListComponent,
  Item: ItemComponent,
  Action: ActionComponent,
  Extras: ExtrasComponent,
  Divider: DividerComponent,
});

const NavContainer = tw.div`
  h-[72px] w-full bg-void flex items-center justify-between
`;

// const ItemTitle = tw.h2`
//  text-zap text-sm font-medium
// `;
// const ItemSubtext = tw.p`
//   border-opus text-opus border-b-[0.33px] border-dashed font-mono text-[12px] tracking-wide
// `;

// const NavHeader = ({ children }: Children) => {
//   return (
//     <Flex>
//       <div className="flex w-[72px] items-center justify-center">
//         <WebhookIcon size={16} className="text-kindle" />
//       </div>
//       <Block className="items-start" spacing="space-y-[6px]">
//         <h2 className="text-zap text-sm font-medium">{webhook.webhook.name}</h2>
//         <p className="border-opus text-opus border-b-[0.33px] border-dashed font-mono text-[12px] tracking-wide">
//           {minifyve(webhook.webhook.id)}
//         </p>
//       </Block>
//     </Flex>
//   );
// };
