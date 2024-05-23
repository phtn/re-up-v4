"use client";

import { Button } from "@src/app/(ui)/button";
import { prettyDate } from "@src/utils/helpers";
import {
  ArchiveXIcon,
  BarcodeIcon,
  BuildingIcon,
  CalendarIcon,
  FileSymlinkIcon,
  MailIcon,
  MapPin,
  SettingsIcon,
  SmartphoneIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";
import { useContext } from "react";
import tw from "tailwind-styled-components";
import { Header } from "../../(components)/header";
import { PaymentsContext } from "../../(context)/context";
import { useCustomerSettings } from "./hooks";
import { useRouter } from "next/navigation";

export const CustomerContent = ({ id }: { id: string }) => {
  const query = useContext(PaymentsContext);
  const customer = query?.customers?.customerList?.find(
    (data) => data.customerNumber === id,
  );
  const invoices = query?.invoices.invoiceList?.filter(
    (item) => item?.customerId === customer?.id,
  );

  const router = useRouter();
  const handleCreateInvoiceRoute = () => {
    if (customer?.id) {
      router.push(`/services/payments/invoices/create/${customer?.id}/0`);
    }
  };

  const createdAt = prettyDate(customer?.createdAt).split(" at ");
  const address = customer?.address;
  const { handleCopyInfo } = useCustomerSettings();

  return (
    <div className="">
      <div className="flex items-center justify-between portrait:px-2">
        <div className="flex items-center space-x-4 portrait:space-x-1">
          <UserRoundIcon className="size-5 stroke-1 text-dyan/60 portrait:size-4" />
          <Header title={`${customer?.name?.toUpperCase()}`} />
          <p className="portrait:hidden">{id}</p>
        </div>
        <div className="flex items-center space-x-4 px-4 portrait:space-x-1 portrait:px-0">
          <Button
            onClick={handleCreateInvoiceRoute}
            className="flex h-[32px] items-center space-x-2 rounded border-[0.33px] border-indigo-500/50 bg-indigo-50 text-sm text-indigo-500 transition-colors duration-300 hover:bg-indigo-500 hover:text-white"
          >
            <p>Create Invoice</p>
            <FileSymlinkIcon className="size-[15px] stroke-[1.5px]" />
          </Button>
          <Button className="h-[32px] rounded border-[0.33px] border-paper bg-paper text-dyan/50 transition-all duration-300 hover:border-dyan hover:text-dyan hover:shadow-sm">
            <SettingsIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100vh-175px)] space-y-6 overflow-y-scroll pr-4 text-xs text-dyan portrait:pr-0">
        <div className="portrait:px-2">
          <div>
            <Header title="Basic Info" />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:px-2 md:grid-cols-8">
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
            <BillingInfo
              email={`${customer?.email}**`}
              address={`${address?.line1}*${address?.city}, ${address?.state}*${address?.country}, ${address?.postalCode}`}
              shipping={`${address?.line1}*${address?.city}, ${address?.state}*${address?.country}, ${address?.postalCode}`}
              copy={handleCopyInfo}
            />
          </div>
        </div>

        <Stats invoices={invoices?.length} />
        <Transactions />
      </div>
    </div>
  );
};

type BillingInfoProps = {
  email: string | undefined;
  address: string;
  shipping: string;
  copy: (label: string, value: string | undefined) => () => void;
};
const BillingInfo = (props: BillingInfoProps) => {
  const { email, address, shipping, copy } = props;
  return (
    <div className="col-span-5">
      <DetailContainer>
        <BillingDetail
          title="Bill to"
          label="billing email"
          icon={MailIcon}
          value={email}
          copy={copy}
        />
        <BillingDetail
          title="Address"
          label="billing address"
          icon={MapPin}
          value={address}
          copy={copy}
        />
        <BillingDetail
          title="Shipping"
          label="shipping address"
          icon={MapPin}
          value={shipping}
          copy={copy}
        />
      </DetailContainer>
    </div>
  );
};

type StatsProps = {
  invoices: number | undefined;
};
const Stats = (props: StatsProps) => {
  const { invoices } = props;
  return (
    <div className="text-dyan portrait:h-fit portrait:px-2">
      <Header title="Stats" />
      <div className="grid h-full grid-cols-5 portrait:grid-cols-3 portrait:gap-y-4 portrait:px-2">
        <Stat label="spent" value={0} />
        <Stat label="invoices" value={invoices} />
        <Stat label="pending" value={0} />
        <Stat label="delayed" value={0} />
        <Stat label="completed" value={0} />
      </div>
    </div>
  );
};

const Transactions = () => {
  return (
    <div>
      <div className="portrait:px-2">
        <Header title="Transaction History" />
      </div>
      <div className="flex h-[200px] w-full items-center justify-center rounded bg-paper portrait:rounded-none">
        <div className="flex items-center space-x-4 text-dyan/50 portrait:space-x-2">
          <p>No records in history.</p>
          <ArchiveXIcon className="size-4 stroke-1" />
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
    <div className="col-span-4 flex items-center space-x-2 font-mono font-light text-dyan/80">
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

type StatProps = {
  label: string;
  value: number | string | undefined;
};
const Stat = (props: StatProps) => (
  <div className="flex flex-col items-start justify-center">
    <div className="flex flex-col items-start justify-center">
      <p className="text-xl font-semibold tracking-tight">{props.value}</p>
      <p className="font-mono text-xs font-light text-dyan/80">{props.label}</p>
    </div>
  </div>
);

const BillingDetail = (props: DetailProps) => {
  const line = props?.value?.split("*") ?? ["", "", ""];
  return (
    <div className="grid grid-cols-8 py-[4.55px] text-[13px]">
      <div className="col-span-3 flex items-start space-x-2 font-mono font-light text-dyan/80">
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
