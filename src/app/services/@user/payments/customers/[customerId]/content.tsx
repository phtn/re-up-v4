"use client";

import { Button } from "@src/app/(ui)/button";
import { prettyDate } from "@src/utils/helpers";
import {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <UserRoundIcon className="size-5 text-copper/60" />
          <Header title={`${customer?.name?.toUpperCase()}`} />
          <p>{id}</p>
        </div>
        <div className="flex items-center space-x-4 px-4">
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
      <div className="h-[520px] space-y-6 overflow-scroll pr-4 text-xs text-dyan">
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
        <div className="h-[120px] text-dyan">
          <div className="grid h-full grid-cols-5">
            <Stats label="total spent" value={0} />
            <Stats label="invoices" value={invoices?.length} />
            <Stats label="pending" value={0} />
            <Stats label="delayed" value={0} />
            <Stats label="completed" value={0} />
          </div>
        </div>

        <div>
          <Header title="Transactions" />
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

type StatsProps = {
  label: string;
  value: number | string | undefined;
};
const Stats = (props: StatsProps) => (
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
