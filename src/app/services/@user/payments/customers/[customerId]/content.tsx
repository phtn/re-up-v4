"use client";
import { useContext } from "react";
// import { useEffect, useState } from "react";
import { Header } from "../../(components)/header";
import {
  BarcodeIcon,
  BuildingIcon,
  type LucideIcon,
  MailIcon,
  SmartphoneIcon,
  UserRoundIcon,
  CalendarIcon,
  MapPin,
} from "lucide-react";
import { PaymentsContext } from "../../(context)/context";
import { useCustomerSettings } from "./hooks";
import { prettyDate } from "@src/utils/helpers";
import tw from "tailwind-styled-components";

export const CustomerContent = ({ id }: { id: string }) => {
  const query = useContext(PaymentsContext)?.customers;
  const customer = query?.customerList?.find(
    (data) => data.customerReferenceId === id,
  );

  const createdAt = prettyDate(customer?.createdAt).split(" at ");
  const address = customer?.address;
  const { handleCopyInfo } = useCustomerSettings();

  return (
    <div className="">
      {/* <div
        onClick={handleCopyInfo("customer id", customer?.customerNumber)}
        className="flex items-center space-x-3 pt-5 text-dyan/60"
      >
        <BarcodeIcon size={15} />
        <p className="cursor-pointer font-mono text-[13.5px] tracking-wide decoration-dyan/50 decoration-dashed underline-offset-4 hover:underline">
          {customer?.customerNumber}
        </p>
      </div> */}
      <div className="flex items-center space-x-3">
        <UserRoundIcon className="size-5 text-copper/60" />
        <Header title={`${customer?.name?.toUpperCase()}`} />
      </div>
      <div className="h-[520px] overflow-scroll pr-4 text-xs text-dyan">
        <div className="grid grid-cols-1 gap-x-2 md:grid-cols-8">
          <DetailContainer className="col-span-3">
            <Detail
              title="Id"
              label="customer id"
              icon={BarcodeIcon}
              value={customer?.customerNumber}
              copy={handleCopyInfo}
            />
            <Detail
              title="Email"
              label="email"
              icon={MailIcon}
              value={customer?.email}
              copy={handleCopyInfo}
            />
            <Detail
              title="Phone number"
              label="phone number"
              icon={SmartphoneIcon}
              value={customer?.phone}
              copy={handleCopyInfo}
            />
            <Detail
              title="Organization"
              label="organization name"
              icon={BuildingIcon}
              value={customer?.organizationName}
              copy={handleCopyInfo}
            />
            <Detail
              title="Customer since"
              label="customer start date"
              icon={CalendarIcon}
              value={createdAt[0]}
              copy={handleCopyInfo}
            />
          </DetailContainer>
          <DetailContainer className="col-span-2">
            <Stats title="Invoices" value={0} />
            <Stats title="Payments" value={0} />
            <Stats title="Pending" value={0} />
            <Stats title="Delayed" value={0} />
            <Stats title="Total sales" value={"₱0.00"} />
          </DetailContainer>

          <DetailContainer className="col-span-3">
            <BillingDetail
              title="Bill to"
              label="billing email"
              icon={MailIcon}
              value={`${customer?.email}**`}
              copy={handleCopyInfo}
            />
            <BillingDetail
              title="Address"
              label="billing address"
              icon={MapPin}
              value={`${address?.line1}*${address?.city}, ${address?.state}*${address?.country}, ${address?.postalCode}`}
              copy={handleCopyInfo}
            />
            <BillingDetail
              title="Shipping"
              label="shipping address"
              icon={MapPin}
              value={`${address?.line1}*${address?.city}, ${address?.state}*${address?.country}, ${address?.postalCode}`}
              copy={handleCopyInfo}
            />
          </DetailContainer>
        </div>

        <div>
          <Header title="Payments" />
        </div>
      </div>
    </div>
  );
};

type DetailProps = {
  title: string;
  label: string;
  icon: LucideIcon;
  value: string | undefined;
  copy: (label: string, value: string | undefined) => () => void;
};
const Detail = (props: DetailProps) => (
  <div className="grid grid-cols-8 text-[13px]">
    <div className="col-span-4 flex items-center space-x-2 font-mono font-light uppercase tracking-wider text-dyan/80">
      <props.icon className="size-[13px] fill-sky-400/30 stroke-[1.5px] text-dyan" />
      <p className="">{props.title}</p>
    </div>
    <div
      onClick={props.copy(props.label, props?.value)}
      className="group col-span-4 h-fit cursor-pointer overflow-x-scroll whitespace-nowrap border-[0.0px] border-dyan"
    >
      <p className="my-[2px] text-[14px] font-medium decoration-dyan/50 decoration-dashed underline-offset-4 group-hover:underline">{`${props?.value}`}</p>
    </div>
  </div>
);

type StatsProps = {
  title: string;
  value: number | string | undefined;
};
const Stats = (props: StatsProps) => (
  <div className=" flex w-full items-center justify-between text-[13px]">
    <div className="col-span-2space-x-2 font-mono font-light uppercase tracking-wider text-dyan/80">
      <p className="">{props.title}</p>
    </div>
    <div className="col-span-3 my-[2px] cursor-pointer font-mono text-[16px] font-normal tracking-widest decoration-dyan/50 decoration-dashed underline-offset-4 hover:underline">{`${props?.value}`}</div>
  </div>
);

const BillingDetail = (props: DetailProps) => {
  const line = props?.value?.split("*") ?? ["", "", ""];
  return (
    <div className="grid grid-cols-8 py-[4.55px] text-[13px]">
      <div className="col-span-3 flex items-start space-x-2 font-mono font-light uppercase tracking-wider text-dyan/80">
        <props.icon className="size-[13px] fill-sky-400/30 stroke-[1.5px] text-dyan" />
        <p>{props.title}</p>
      </div>
      <div
        onClick={props.copy(props.label, `${line[0]} ${line[1]} ${line[2]}`)}
        className="col-span-5 cursor-pointer text-[12px] font-medium decoration-dyan/50 decoration-dashed underline-offset-4 hover:underline"
      >
        <div>{`${line[0]}`}</div>
        <div>{`${line[1]}`}</div>
        <div>{`${line[2]}`}</div>
      </div>
    </div>
  );
};

const DetailContainer = tw.div`
 h-fit space-y-5 rounded-lg border-[0.0px] border-dyan/40 bg-paper p-4
  `;
