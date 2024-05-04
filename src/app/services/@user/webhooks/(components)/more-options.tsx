import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@ui/command";
import { Popover, PopoverTrigger } from "@@ui/popover";
import { DarkTouch, Touch } from "@@ui/touch";
import { cn } from "@src/utils/cn";
import { MoreVerticalIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Beach } from "../[webhookId]/[endpointId]/(endpoint)/styles";

type MoreOptionsProps = {
  webhookId: string | undefined;
};

/**
 * MoreOptions
 * @location /webhooks/(components)
 */
export const MoreOptions = ({ webhookId }: MoreOptionsProps) => {
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

      <Beach align="end">
        <Command>
          <CommandList>
            <CommandGroup
              heading="Webhook Menu"
              className="font-jet text-cyan-950"
            >
              <CommandItem className="space-x-4 rounded-none px-4 hover:bg-cyan-700/10">
                <PlusIcon className="size-4 text-opus" />
                <div className="flex h-[50px] flex-col justify-center">
                  <p className="text-sm font-bold tracking-tight text-cyan-950">
                    Create a new endpoint
                  </p>
                  <p className="font-jet text-[11px] leading-[11px] text-coal">
                    {webhookId?.slice(-6)}
                  </p>
                </div>
              </CommandItem>

              <CommandSeparator />

              <CommandItem>
                <DarkTouch
                  className="w-full text-kindle"
                  tail={XIcon}
                  onClick={() => console.log("deleted.")}
                >
                  Delete Webhook
                </DarkTouch>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Beach>
    </Popover>
  );
};
