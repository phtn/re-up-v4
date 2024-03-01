import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../_components/popover";
import { DarkTouch, Touch } from "../_components/touch";
import { Disc3Icon, FanIcon, LogOutIcon, UserIcon } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../_components/command";
import tw from "tailwind-styled-components";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@src/lib/db";
import { onSuccess } from "@src/utils/toast";

type UserNavProps = {
  user: string | null | undefined;
};

export const UserNav = ({ user }: UserNavProps) => {
  const [signOut, loading] = useSignOut(auth);

  const handleLogout = async () => {
    await signOut();
    onSuccess("Logged out successfully!");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Touch
          size="sm"
          variant={"ghost"}
          iconClass={!user || loading ? `animate-spin` : ``}
          icon={!user ? Disc3Icon : UserIcon}
        >
          {user ?? `loading... `}
        </Touch>
      </PopoverTrigger>

      <PopoverContent className="border-ash bg-zap mr-1 mt-[13px] w-[200px] border-[0.33px] p-0 md:mr-[32px]">
        <Command className="pointer-events-none">
          <CommandList className="pointer-events-none">
            <CommandGroup className="pointer-events-none">
              <CmdItem>
                <FanIcon
                  className="text-whb mx-1 mr-3 h-[36px] w-[36px] rounded p-[6px]"
                  fill="rgba(186,230,253,0.2)"
                  strokeWidth={1}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-void text-sm font-bold tracking-tight">
                    Access Portal
                  </p>
                  <p className="text-coal text-[11px] font-normal leading-[11px]">
                    portal
                  </p>
                </div>
              </CmdItem>

              <CmdItem>
                <FanIcon
                  className="text-whb mx-1 mr-3 h-[36px] w-[36px] rounded p-[6px]"
                  fill="rgba(186,230,253,0.2)"
                  strokeWidth={1}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-void text-sm font-bold tracking-tight">
                    Logout
                  </p>
                  <p className="text-coal text-[11px] font-normal leading-[11px]">
                    portal
                  </p>
                </div>
              </CmdItem>

              <CmdItem>
                <DarkTouch
                  className="text-kindle w-full"
                  iconClass={loading ? `animate-spin` : ``}
                  tail={loading ? Disc3Icon : LogOutIcon}
                  onClick={handleLogout}
                >
                  Logout
                </DarkTouch>
              </CmdItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CmdItem = tw(CommandItem)`
  rounded-none py-3 pointer-events-auto
  bg-gradient-to-br from-zap/20 via-sky-200/20 to-whb/10 bg-size-200 bg-pos-0
  bg-[linear-gradient(120deg,#ffaa6f,45%,#000000,55%,#000103)] bg-[length:200%_100%]
  hover:animate-shimmer-once
`;
