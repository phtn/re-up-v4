import { MinusIcon } from "lucide-react";

export const Footer = () => (
  <div className="flex h-[70px] w-full items-center justify-between text-[10px] text-cyan-100">
    <p className="flex items-center font-sans font-semibold tracking-tight">
      re-up.ph &copy;
      <span className=" mx-2 font-light">
        all rights reserved. {new Date().getFullYear().toString()}
      </span>
    </p>
    <div className="items-cente flex space-x-1 md:space-x-4">
      <p className="font-sans font-light tracking-tight">Privacy</p>
      <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
      <p className="font-sans font-light tracking-tight">Terms</p>
    </div>
  </div>
);
