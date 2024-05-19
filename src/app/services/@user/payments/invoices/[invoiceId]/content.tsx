"use client";

import { type Dispatch, type SetStateAction, useContext, useMemo } from "react";
import { PaymentsContext } from "../../(context)/context";
import { Header } from "../../(components)/header";
import { CalendarIcon, LoaderIcon, QrCodeIcon, SendIcon } from "lucide-react";
import { prettyDate } from "@src/utils/helpers";
import { getDecimalAmount } from "../../(hooks)/helpers";
import tw from "tailwind-styled-components";
import { Button } from "@src/app/(ui)/button";
import { cn } from "@src/utils/cn";
import { type LineItemResponseSchema } from "@src/server/resource/copperx/invoice";
import { AuthContext } from "@src/app/(main)/context";
import { type QrResource, useIcash } from "../../(hooks)/invoice";
import Image from "next/image";
import { Calendar } from "@src/app/(ui)/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@src/app/(ui)/popover";
import { useInvoiceUpdate } from "./hooks";

export const InvoiceContent = ({ id }: { id: string | undefined }) => {
  const userProfile = useContext(AuthContext)?.profile;
  const invoices = useContext(PaymentsContext)?.invoices;
  const invoice = useMemo(
    () => invoices?.invoiceList?.find((item) => item.id === id),
    [invoices, id],
  );

  const invoiceDates: DateSettingProps = useMemo(
    () => ({
      currentDueDate: invoice?.dueDate ? new Date(invoice.dueDate) : undefined,
      currentPeriodEnd: invoice?.periodEnd
        ? new Date(invoice.periodEnd)
        : undefined,
      currentPeriodStart: invoice?.periodStart
        ? new Date(invoice.periodStart)
        : undefined,
    }),
    [invoice?.dueDate, invoice?.periodEnd, invoice?.periodStart],
  );

  const qr_resource: QrResource = useMemo(
    () => ({
      merchantCustomerId: `${userProfile?.van}`,
      firstName: `${userProfile?.firstName}`,
      lastName: `${userProfile?.displayName}`,
      amount: parseFloat(getDecimalAmount(invoice?.total) as string),
    }),
    [
      userProfile?.van,
      invoice?.total,
      userProfile?.firstName,
      userProfile?.displayName,
    ],
  );

  const { generateQR, imageUrl, icashLoading } = useIcash();

  const handleGenerateQr = () => generateQR(qr_resource);
  return (
    <div className="pr-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Header title={`Invoice`} />
          <p className="-mb-[3px] font-bold text-dyan/40">#</p>
          <p className="-mb-[3px] flex h-[64px] items-center font-mono uppercase text-dyan/90">
            {id?.substring(0, 13)}
          </p>
        </div>
        <div>
          {invoices?.fetchingInvoices ? (
            <LoaderIcon className="animate-spin stroke-1 text-dyan/50" />
          ) : (
            <div className="grid h-[56px] w-full grid-cols-4 gap-4">
              <Widget>
                <p className="text-sm font-semibold tracking-tight text-dyan">
                  {invoice?.customer?.name}
                </p>
                <Subtext>Customer</Subtext>
              </Widget>

              <Widget>
                <p className="flex items-center text-sm font-semibold tracking-tight text-dyan">
                  {getDecimalAmount(invoice?.total)}
                  <span className="px-1 font-mono text-xs font-light uppercase tracking-tighter text-sky-600">
                    {invoice?.currency === "tfi" ? "php" : invoice?.currency}
                  </span>
                </p>
                <Subtext>Total Amount</Subtext>
              </Widget>
              <Widget>
                <p className="text-sm font-semibold tracking-tight text-dyan">
                  {invoice?.status}
                </p>
                <Subtext>Status</Subtext>
              </Widget>
              <Widget>
                <p className="text-sm font-semibold tracking-tight text-dyan">
                  {prettyDate(invoice?.dueDate).substring(
                    0,
                    prettyDate(invoice?.dueDate).indexOf("at"),
                  )}
                </p>
                <Subtext>Invoice date</Subtext>
              </Widget>
            </div>
          )}
        </div>
      </div>

      <div className="h-[564px] space-y-12 overflow-y-scroll">
        <div className=" pt-4">
          <div className="rounded border-[0.33px] border-sky-600/30 bg-sky-50/50 p-2 shadow-sm">
            <div className="grid h-6 w-full grid-cols-10 px-2 text-xs font-medium tracking-tight text-dyan">
              <div className="col-span-5">Product</div>
              <div className="col-span-1 flex justify-center">Qty</div>
              <div className="col-span-2 flex justify-end">Unit Price</div>
              <div className="col-span-2 flex justify-end">Total</div>
            </div>
            <div className="border-b border-dashed border-dyan/40" />
            <div className="overflow-y-scroll rounded-[6px] border-[0px] border-clay/50 bg-zap/80">
              <LineItem items={invoice?.lineItems.data} label="Item" />
            </div>
            <div className="border-b-2 border-dashed border-dyan/10" />
          </div>
        </div>

        <div className="">
          <div className="flex items-center space-x-4 px-2 pb-3 pt-3">
            <p className="font-semibold tracking-tighter text-dyan/70">
              Date Settings
            </p>
            {/* <p>{new Date(invoice?.createdAt).toLocaleDateString()}</p> */}
          </div>
          <div className="flex h-[120px] w-fit items-center rounded border-[0.33px] border-ash/50 bg-paper p-4 shadow-sm">
            <DateSettings {...invoiceDates} />
          </div>
        </div>
        <div className="h-[364px] w-full">
          <div className="flex items-center space-x-4 px-2 pb-3 pt-4">
            <p className="font-semibold tracking-tighter text-dyan/70">
              Payment Options
            </p>
            <Button
              disabled={!!imageUrl || icashLoading}
              onClick={handleGenerateQr}
              className="h-[24px] border-[0.33px] border-indigo-400 bg-indigo-50 p-1 text-xs text-indigo-500/90 hover:text-indigo-600"
            >
              Generate QR
            </Button>
            {icashLoading ? (
              <LoaderIcon className="size-4 animate-spin text-indigo-500" />
            ) : null}
          </div>
          <div className="grid h-[260px] w-full grid-cols-5 gap-6">
            <div className="col-span-2 flex items-center justify-center rounded border-[0.33px] border-indigo-600/20 bg-indigo-50/50 shadow-sm">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="qrcode"
                  width={0}
                  height={0}
                  className="h-[200px] w-auto"
                />
              ) : (
                <QrCodeIcon className="fill-indigo-50/50 stroke-1 text-indigo-500/70" />
              )}
            </div>
            <div className="col-span-3 rounded border-[0.33px] border-dyan/20 shadow-sm">
              direct
            </div>
          </div>
        </div>

        <div className="flex h-[60px] items-center justify-between rounded">
          <div className="flex items-center space-x-16">
            <div>
              <p className="font-semibold tracking-tight text-dyan">
                {invoice?.customer?.email}
              </p>
              <Subtext>Customer billing email</Subtext>
            </div>
            <div>include cc</div>
          </div>
          <Button
            variant={"default"}
            className="space-x-2 bg-sky-500 px-4 text-white"
          >
            <p>Save and send</p>
            <SendIcon size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

type LineItemProps = {
  items: LineItemResponseSchema[] | undefined;
  label?: string;
};
const LineItem = (props: LineItemProps) => {
  const { items } = props;
  if (!items) return;

  return (
    <>
      {items?.map((item, i) => (
        <div
          key={i}
          className={cn(
            "flex h-16 items-center border-clay/50 px-3 text-xs text-dyan",
            i !== items.length - 1 ? "border-b-[0.33px]" : "border-0",
          )}
        >
          <div className="grid w-full grid-cols-10">
            <div className="col-span-5 flex flex-col space-y-1 overflow-x-scroll whitespace-nowrap">
              <p className="text-[16px] font-semibold tracking-tight text-dyan">
                {item.price?.product?.name}
              </p>
              <p className="text-dyan/70">{item.price?.product?.description}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center font-mono">
              {item.quantity}
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-1 uppercase">
              <div className="flex items-center space-x-0.5 font-mono tracking-tighter">
                <p className="text-sm">
                  {getDecimalAmount(String(item.price?.unitAmount))}
                </p>
                <p className="text-[12px] font-normal text-dyan/50">
                  {item.price?.currency}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-1 uppercase">
              <div className="flex items-center space-x-0.5 tracking-tighter">
                <p className="font-mono text-sm font-medium">
                  {getDecimalAmount(
                    String(+item.price?.unitAmount * item.quantity),
                  )}
                </p>
                <p className="font-mono text-xs text-dyan/50">
                  {item.price?.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const Widget = tw.div`
   h-full w-full flex flex-col items-center justify-center
   rounded bg-paper/20 px-4
  `;

const Subtext = tw.p`
  font-mono text-xs text-dyan/80 tracking-tight
  `;

type DateSettingProps = {
  currentDueDate: Date | undefined;
  currentPeriodEnd: Date | undefined;
  currentPeriodStart: Date | undefined;
};
const DateSettings = (props: DateSettingProps) => {
  const { currentDueDate, currentPeriodEnd, currentPeriodStart } = props;
  const {
    dueDate,
    setDueDate,
    periodEnd,
    setPeriodEnd,
    periodStart,
    setPeriodStart,
  } = useInvoiceUpdate();
  // const dueDateSet = useMemo(() => ())
  return (
    <div className="flex items-center space-x-10">
      <DatePicker
        id="dueDate"
        label="Due date"
        placeholder="Set due date"
        selected={dueDate ?? currentDueDate}
        onSelect={setDueDate}
      />
      <DatePicker
        id="periodStart"
        label="Start Period"
        placeholder="Set start period"
        selected={periodStart ?? currentPeriodStart}
        onSelect={setPeriodStart}
      />
      <DatePicker
        id="periodEnd"
        label="End Period"
        placeholder="Set end period"
        selected={periodEnd ?? currentPeriodEnd}
        onSelect={setPeriodEnd}
      />
      <div className="min-w-[200px] space-y-2">
        <p className="text-sm font-medium tracking-tight">Update dates</p>
        <div className="flex items-center space-x-4">
          <Button className="flex h-[32px] items-center border-[0.33px] bg-white px-2.5 text-xs shadow-sm">
            <p className="font-mono tracking-wide text-dyan/80">Cancel</p>
          </Button>
          <Button className="flex h-[32px] items-center border-[0.33px] bg-sky-500 px-2.5 text-xs text-white shadow-sm">
            <p className="font-mono tracking-wide">Update</p>
          </Button>
        </div>
      </div>
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
    <div className="min-w-[200px] space-y-2">
      <p className="text-sm font-semibold tracking-tight">{label}</p>
      <Popover>
        <PopoverTrigger>
          <Button
            className={cn(
              id === "dueDate"
                ? "border-sky-700/30 bg-sky-50"
                : id === "periodStart"
                  ? "border-emerald-700/30 bg-emerald-50"
                  : "border-rose-700/30 bg-rose-50",
              "flex h-[32px] items-center space-x-6 border-[0.33px] px-2.5 text-xs shadow-sm",
            )}
          >
            <p className="font-mono tracking-wide text-dyan/80">
              {selected ? selected.toLocaleDateString() : placeholder}
            </p>
            <CalendarIcon className="ml-auto size-4 text-dyan opacity-50" />
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

const Content = tw(PopoverContent)`
  w-auto bg-black/80 p-0 backdrop-blur-md border-0 rounded text-white
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/50 to-yellow-500 backdrop-blur-lg
  `;
