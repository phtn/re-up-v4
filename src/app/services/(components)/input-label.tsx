import { cn } from "@src/utils/cn";
import { ArrowDownLeftIcon } from "lucide-react";

type InputLabelProps = {
  label: string | undefined;
};
export const InputLabel = ({ label }: InputLabelProps) => {
  const withReq = label?.split("@") ?? ["", ""];
  return (
    <p className="flex w-full items-center whitespace-nowrap border-l-[0.33px] border-ash/50 pl-3 pt-1 font-mono text-[10px] font-normal uppercase tracking-widest text-dyan/70">
      {withReq[0] ?? label}
      {withReq[1] ? (
        <span
          className={cn(
            withReq[1] ? "mx-2" : "",
            "flex h-fit items-end whitespace-nowrap rounded-full bg-amber-700/10 font-mono font-normal lowercase tracking-wider text-orange-600/80",
          )}
        >
          <ArrowDownLeftIcon size={14} />
        </span>
      ) : null}
    </p>
  );
};
