import { MinusIcon } from "lucide-react";

export const Footer = () => (
  <div className="flex h-[70px] w-full items-center justify-center space-x-1 md:space-x-4">
    <p className="font-sans text-[12px] font-semibold tracking-tight text-dyan">
      re-up.ph &copy;
      <span className=" mx-2 font-light">
        {new Date().getFullYear().toString()}
      </span>
    </p>
    <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
    <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
      Privacy
    </p>
    <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
    <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
      Terms
    </p>
  </div>
);
