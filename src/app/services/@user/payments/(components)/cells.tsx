import { prettyDate } from "@src/utils/helpers";

export const DateTimeCell = ({ date }: { date: string | undefined }) => {
  const timestamp = prettyDate(date);
  const datetime = timestamp.split(" at ");
  return (
    <div className="flex flex-col items-center justify-center space-y-0.5 px-1">
      <div className="flex flex-col items-end">
        <p className="font-sans text-xs font-medium">{datetime[0]}</p>
        <p className="text-[11px] tracking-wide text-dyan/60">{datetime[1]}</p>
      </div>
    </div>
  );
};
