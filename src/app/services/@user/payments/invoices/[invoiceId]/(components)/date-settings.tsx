import { Button } from "@src/app/(ui)/button";
import { Calendar } from "@src/app/(ui)/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@src/app/(ui)/popover";
import { cn } from "@src/utils/cn";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import tw from "tailwind-styled-components";
import { useInvoiceUpdate } from "../hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@src/lib/db";
import { type UpdatePaymentInternalSchema } from "@src/server/resource/payments/updates";
import { Title } from "./styles";

export const DateSettings = (props: DateSetterProps) => {
  return (
    <div className="w-full">
      <Title text="Date Settings" />
      <div className="flex h-[120px] items-center rounded border-[0.33px] border-dyan/50 bg-paper p-4 shadow-sm portrait:h-fit">
        <DateSetter {...props} />
      </div>
    </div>
  );
};

// () => console.log(new Date(selected!).toISOString())
const isoFmt = (selectedDate: Date | undefined): string | undefined => {
  return selectedDate ? new Date(selectedDate).toISOString() : undefined;
};

export type DateSetterProps = {
  invoiceId: string | undefined;
  currentDueDate: Date | undefined;
  currentPeriodEnd: Date | undefined;
  currentPeriodStart: Date | undefined;
};
const DateSetter = (props: DateSetterProps) => {
  const [touched, setTouched] = useState(false);
  const { currentDueDate, currentPeriodEnd, currentPeriodStart, invoiceId } =
    props;

  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const {
    dueDate,
    periodEnd,
    setDueDate,
    periodStart,
    setPeriodEnd,
    updateLoading,
    setPeriodStart,
    handleDateUpdate,
  } = useInvoiceUpdate({ invoiceId, userId });

  const handleTouchDatePicker = () => {
    setTouched(true);
  };

  const updateResource: UpdatePaymentInternalSchema = useMemo(
    () => ({
      payload: {
        dueDate: isoFmt(dueDate),
        periodEnd: isoFmt(periodEnd),
        periodStart: isoFmt(periodStart),
      },
      document: "invoices",
      docId: invoiceId,
      userId,
    }),
    [dueDate, periodEnd, periodStart, invoiceId, userId],
  );
  return (
    <div
      className="flex items-center space-x-10 portrait:grid portrait:grid-cols-2 portrait:justify-center portrait:gap-8 portrait:space-x-0"
      onClick={handleTouchDatePicker}
    >
      <DatePicker
        id="dueDate"
        label="Set due date"
        placeholder="Set due date"
        selected={dueDate ?? currentDueDate}
        onSelect={setDueDate}
      />
      <DatePicker
        id="periodStart"
        label="Start a start period"
        placeholder="Set start period"
        selected={periodStart ?? currentPeriodStart}
        onSelect={setPeriodStart}
      />
      <DatePicker
        id="periodEnd"
        label="Set end period"
        placeholder="Set end period"
        selected={periodEnd ?? currentPeriodEnd}
        onSelect={setPeriodEnd}
      />
      {touched ? (
        <ConfirmUpdate
          loading={updateLoading}
          update={handleDateUpdate(updateResource)}
        />
      ) : null}
    </div>
  );
};

type DatePickerProps = {
  id: string;
  label: string;
  placeholder: string;
  selected: Date | undefined;
  onSelect: Dispatch<SetStateAction<Date | undefined>>;
};
const DatePicker = ({
  id,
  label,
  placeholder,
  selected,
  onSelect,
}: DatePickerProps) => {
  return (
    <div className="min-w-[200px] space-y-1 portrait:min-w-[100px]">
      <p className="text-xs font-normal tracking-tight">{label}</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              id === "dueDate"
                ? "border-sky-700/20 bg-sky-50"
                : id === "periodStart"
                  ? "border-emerald-700/20 bg-emerald-50"
                  : "border-rose-700/20 bg-rose-50",
              "flex h-[32px] items-center space-x-6 border-[0.33px] px-2.5 text-xs shadow-sm",
            )}
          >
            <p className="tracking-wide text-dyan">
              {selected ? selected.toLocaleDateString() : placeholder}
            </p>
            <CalendarIcon className="ml-auto size-4 stroke-1 text-dyan opacity-40" />
          </Button>
        </PopoverTrigger>
        <Content align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            className="rounded"
          />
        </Content>
      </Popover>
    </div>
  );
};

type ConfirmUpdateProps = {
  loading: boolean;
  update: () => void;
};
const ConfirmUpdate = ({ loading, update }: ConfirmUpdateProps) => {
  return (
    <div className="min-w-[200px] space-y-2">
      <p className="text-sm font-medium tracking-tight text-sky-500">
        Ready to update?
      </p>
      <div className="flex items-center space-x-4">
        <Button className="flex h-[32px] items-center border-[0.33px] bg-white px-2.5 text-xs shadow-sm">
          <p className="font-medium tracking-wide text-dyan/80">Cancel</p>
        </Button>
        <Button
          disabled={loading}
          onClick={update}
          className="flex h-[32px] w-[70px] items-center border-[0.33px] bg-sky-400 px-2.5 text-xs text-white shadow-sm"
        >
          {loading ? (
            <LoaderIcon className="size-4 animate-spin text-white" />
          ) : (
            <p className="font-medium tracking-wide">Save</p>
          )}
        </Button>
      </div>
    </div>
  );
};

const Content = tw(PopoverContent)`
  w-auto bg-black/80 p-0 backdrop-blur-md border-0 rounded text-white
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/50 to-yellow-500 backdrop-blur-lg
  `;
