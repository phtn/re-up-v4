import { auth } from "@@lib/db";
import { Command, CommandGroup, CommandList } from "@@ui/command";
import { PopoverContent, PopoverTrigger } from "@@ui/popover";
import { DarkTouch, Touch } from "@@ui/touch";
import { onSuccess } from "@@utils/toast";
import { Popover } from "@radix-ui/react-popover";
import {
  CogIcon,
  CreditCardIcon,
  Disc3Icon,
  LayoutGridIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { useSignOut } from "react-firebase-hooks/auth";
import { BeachItem } from "../webhooks/@premium/[webhookId]/[endpointId]/(endpoint)/styles";
import tw from "tailwind-styled-components";
import Link from "next/link";

type UserMenuProps = {
  user: string | null | undefined;
};

export const UserMenu = ({ user }: UserMenuProps) => {
  const [signOut, loading] = useSignOut(auth);

  const handleLogout = async () => {
    await signOut();
    onSuccess("bye", "Logged out successfully!");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Touch
          size="sm"
          variant={"ghost"}
          className="font-jet tracking-wide"
          iconClass={
            !user || loading ? `animate-spin` : `stroke-[1.5px] hidden md:flex`
          }
          icon={!user ? Disc3Icon : UserIcon}
        >
          {user ?? `authenticating... `}
        </Touch>
      </PopoverTrigger>

      <Content>
        <Dots>
          <Surface>
            <Command>
              <CommandList>
                <CommandGroup heading={""}>
                  <Link href={"/webhooks"}>
                    <BeachItem selected={false} className="h-fit">
                      <ItemBlock>
                        <LayoutGridIcon className="h-4 w-4 text-void/60" />
                        <p>All Services</p>
                      </ItemBlock>
                    </BeachItem>
                  </Link>

                  <Link href={"/account"}>
                    <BeachItem selected={false} className="h-fit">
                      <ItemBlock>
                        <CreditCardIcon className="h-4 w-4 text-void/60" />
                        <p>Billing Options</p>
                      </ItemBlock>
                    </BeachItem>
                  </Link>

                  <BeachItem selected={false} className="h-fit">
                    <ItemBlock>
                      <CogIcon className="h-4 w-4 text-void/60" />
                      <p>Account Settings</p>
                    </ItemBlock>
                  </BeachItem>

                  <BeachItem selected={false} className="h-fit">
                    <DarkTouch
                      className="w-full font-sans font-semibold tracking-tight text-kindle"
                      iconClass={loading ? `animate-spin` : ``}
                      tail={loading ? Disc3Icon : LogOutIcon}
                      onClick={handleLogout}
                    >
                      Logout
                    </DarkTouch>
                  </BeachItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Surface>
        </Dots>
      </Content>
    </Popover>
  );
};

const Content = tw(PopoverContent)`
  bg-coal rounded-md overflow-clip
  border-[0.33px] border-opus/50
  shadow-lg p-0 w-[190px]
  `;
const Dots = tw.div`
  bg-[url('/svg/dots.svg')] bg-contain bg-right-top bg-no-repeat
  `;
const Surface = tw.div`
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-cyan-50/80 via-gray-50 to-orange-50
  flex h- flex-col items-center justify-baseline
`;
const ItemBlock = tw.div`
  flex h-[36px] w-full items-center space-x-2 px-2
  font-sans font-semibold text-sm text-void/80 tracking-tight
  `;

// const CmdItem = tw(CommandItem)`
//   rounded-none py-3 pointer-events-auto
//   bg-gradient-to-br from-zap/20 via-sky-200/20 to-whb/10 bg-size-200 bg-pos-0
//   bg-[linear-gradient(120deg,#ffaa6f,45%,#000000,55%,#000103)] bg-[length:200%_100%]
//   hover:animate-shimmer-once
// `;
