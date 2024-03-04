import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@src/app/_components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/app/_components/popover";
import { DarkTouch, Touch } from "@src/app/_components/touch";
import { cn } from "@src/utils/cn";
import {
  ArrowDownToDotIcon,
  MoreVerticalIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

/**
 * MoreOptions
 * @location /webhooks/(components)
 */
export const MoreOptions = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Touch
          size="sm"
          variant={"ghost"}
          iconClass="h-[24px] w-[24px]"
          icon={MoreVerticalIcon}
          className={cn(open ? `text-cord` : `text-kindle`, `bg-transparent`)}
        />
      </PopoverTrigger>

      <PopoverContent className="border-clay bg-zap mr-1 mt-[13px] w-[200px] border-[0.33px] p-0 md:mr-[32px]">
        <Command className="pointer-events-none">
          <CommandList className="pointer-events-none">
            <CommandGroup className="pointer-events-none">
              <CommandItem className="space-x-4">
                <PlusIcon size={16} className="text-opus" />
                <div className="border-mojo flex h-[50px] flex-col justify-center border-b ">
                  <p className="text-void text-sm font-bold tracking-tight">
                    Create Endpoint
                  </p>
                  <p className="text-coal text-[11px] font-normal leading-[11px]">
                    webhookid
                  </p>
                </div>

                <ArrowDownToDotIcon size={20} className="text-opus" />
              </CommandItem>

              <CommandItem>
                <p className="text-rome mx-1 mr-3 h-[36px] w-[36px] p-[6px]">
                  ⇲
                </p>
                <div className="flex flex-col justify-center">
                  <p className="text-void text-sm font-bold tracking-tight">
                    Create Endpoint
                  </p>
                  <p className="text-coal text-[11px] font-normal leading-[11px]">
                    webhookid
                  </p>
                </div>
              </CommandItem>

              <CommandItem>
                <DarkTouch
                  className="text-kindle w-full"
                  tail={XIcon}
                  onClick={() => console.log("deleted.")}
                >
                  Delete Webhook
                </DarkTouch>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
