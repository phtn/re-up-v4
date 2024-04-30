import { MinusIcon } from "lucide-react";

export const Bottom = () => (
  <div className="flex h-[70px] w-full items-center justify-center space-x-1 md:space-x-4">
    <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
      re-up.ph
    </p>
    <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
    <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
      webhooks
    </p>
    <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
    <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
      payments
    </p>
    <MinusIcon className="rotate-90 stroke-[0.5px] text-opus" />
    <p className="font-sans text-[12px] font-light tracking-tight text-dyan">
      crypto
    </p>
  </div>
);
