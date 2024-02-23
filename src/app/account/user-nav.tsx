import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../_components/popover";
import { DarkTouch, Touch } from "../_components/touch";
import { FanIcon, LogOutIcon, UserIcon } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../_components/command";
import tw from "tailwind-styled-components";
import { hashString } from "@src/utils/helpers";

type UserNavProps = {
  user: string | null | undefined;
};

export const UserNav = ({ user }: UserNavProps) => {
  const handleHash = async () => {
    console.log(
      await hashString(
        "NZTJ9WsIHqNaQZ8GJWkjCyOhhB92",
        new Date().getTime().toString(36),
      ).then((res) => res),
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Touch size="md" icon={UserIcon}>
          {user ?? `loading... `}
        </Touch>
      </PopoverTrigger>

      <PopoverContent className="mr-1 mt-[16px] w-[200px] border-[0.33px] border-ash bg-zap p-0 md:mr-[30px]">
        <Command className="pointer-events-none">
          <CommandList className="pointer-events-none">
            <CommandGroup className="pointer-events-none">
              <CmdItem>
                <FanIcon
                  className="mx-1 mr-3 h-[36px] w-[36px] rounded p-[6px] text-whb"
                  fill="rgba(186,230,253,0.2)"
                  strokeWidth={1}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-bold tracking-tight text-void">
                    Access Portal
                  </p>
                  <p className="text-[11px] font-normal leading-[11px] text-coal">
                    portal
                  </p>
                </div>
              </CmdItem>

              <CmdItem>
                <FanIcon
                  className="mx-1 mr-3 h-[36px] w-[36px] rounded p-[6px] text-whb"
                  fill="rgba(186,230,253,0.2)"
                  strokeWidth={1}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-bold tracking-tight text-void">
                    Logout
                  </p>
                  <p className="text-[11px] font-normal leading-[11px] text-coal">
                    portal
                  </p>
                </div>
              </CmdItem>

              <CmdItem>
                <DarkTouch
                  className="w-full text-kindle"
                  tail={LogOutIcon}
                  onClick={handleHash}
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
