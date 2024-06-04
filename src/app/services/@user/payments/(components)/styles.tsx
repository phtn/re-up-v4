import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@src/app/(ui)/dropdown-menu";
import { PopoverContent } from "@src/app/(ui)/popover";
import { CommandItem } from "@@ui/command";
import { SelectContent, SelectItem } from "@@ui/select";

import tw from "tailwind-styled-components";
import { Cross2Icon } from "@radix-ui/react-icons";

// bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
// from-cyan-800/50 via-orange-50 backdrop-blur-xl
export const content = `
  rounded-md border-[0.0px] border-opus p-0
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yello-500 backdrop-blur-lg
  overflow-clip

  `;

const item = `
  h-[36px] rounded-none cursor-pointer
  font-jet text-xs text-void/80 font-medium
  transition-colors duration-200 ease-in-out
  hover:bg-slate-900/50
  `;

type SelectedItem = {
  selected: boolean;
};

export const Beach = tw(PopoverContent)`
  ${(_) => content}
  `;

export const BeachItem = tw(CommandItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-slate-900/20" : "")}
  `;

export const BeachDrop = tw(DropdownMenuContent)`
  ${(_) => content}
  -mr-[2px] mt-[10.33px] w-[200px]
  `;

export const BeachDropItem = tw(DropdownMenuItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-slate-900/20" : "")}
  `;

export const BeachCheckItem = tw(DropdownMenuCheckboxItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-cyan-700/5" : "")}
  `;

export const BeachSelect = tw(SelectContent)`
  ${(_) => content}
  `;

export const BeachSelectItem = tw(SelectItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-cyan-700/5" : "")}
  `;

export const SpaceX = tw(Cross2Icon)`
  size-0 -rotate-45 text-white hidden animate-in
  transition-all duration-300 ease-in-out
  group-hover:ml-2 group-hover:size-4
  group-hover:rotate-90 group-hover:flex
  `;
