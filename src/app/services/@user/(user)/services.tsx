"use client";

import tw from "tailwind-styled-components";
import {
  ArrowUpRightIcon,
  LoaderIcon,
  type LucideIcon,
  WebhookIcon,
  ListTreeIcon,
  DatabaseIcon,
  ScanTextIcon,
} from "lucide-react";
import Link from "next/link";
import { type ProfileSchema } from "@src/server/resource/account";
import { useState } from "react";
import { BitFlip } from "@src/app/(components)/bit-flip";
import { cn } from "@src/utils/cn";
import type { PaymentServiceProps, WebhookServiceProps } from "./types";

type ServicesDashboardProps = {
  profile: ProfileSchema;
  webhookId: string | undefined;
};

/**
 * @component
 * @name ServicesDashboard
 * @description - a component that displays the user's active services.
 */
export const ServicesDashboard = ({
  profile,
  webhookId,
}: ServicesDashboardProps) => {
  return (
    <Container>
      <Grid>
        <WebhookService profile={profile} webhookId={webhookId} />
        <PaymentService profile={profile} />
        <OCRService profile={profile} webhookId={webhookId} />
        <DatabaseService profile={profile} webhookId={webhookId} />
      </Grid>
    </Container>
  );
};

const WebhookService = ({ profile, webhookId }: WebhookServiceProps) => (
  <div className="w-full p-6 md:p-4">
    <div className="h-[250px] overflow-clip rounded-[4px] border-[0.33px] border-opus bg-void">
      <div className="flex h-full flex-col justify-between bg-[url('/svg/pers_v5.svg')] bg-right-bottom bg-no-repeat">
        <Header title="Webhooks" icon={WebhookIcon} style={"text-cyan-100"} />
        <ActionBar link={`/services/webhooks/${webhookId}`}>
          <Extra
            value={profile?.webhookCount}
            label="Webhooks"
            extra={profile?.webhookCount > 1}
          />
        </ActionBar>
      </div>
    </div>
  </div>
);

const PaymentService = ({ profile }: PaymentServiceProps) => (
  <div className="w-full p-6 md:p-4">
    <div className="h-[250px] overflow-clip rounded-[4px] border-[0.33px] border-opus bg-sky-500">
      <div className="flex h-full flex-col justify-between bg-[url('/svg/pers_v6.svg')] bg-right-bottom bg-no-repeat">
        <Header
          title="Payments & Invoicing"
          icon={ListTreeIcon}
          style={"text-cyan-100"}
        />
        <ActionBar link={`/services/payments`}>
          <Extra
            value={profile?.webhookCount}
            label="Invoices"
            extra={profile?.webhookCount > 1}
          />
        </ActionBar>
      </div>
    </div>
  </div>
);

const OCRService = ({ profile, webhookId }: WebhookServiceProps) => (
  <div className="w-full p-6 md:p-4">
    <div className="h-[250px] overflow-clip rounded-[4px] border-[0.33px] border-opus bg-rose-600/60">
      <div className="flex h-full flex-col justify-between bg-[url('/svg/pers_v7.svg')] bg-right-bottom bg-no-repeat">
        <Header
          title="OCR - Document Reader"
          icon={ScanTextIcon}
          style={"text-cyan-100"}
        />
        <ActionBar link={`/webhooks/${webhookId}`}>
          <Extra
            value={profile?.webhookCount}
            label="Readers"
            extra={profile?.webhookCount > 1}
          />
        </ActionBar>
      </div>
    </div>
  </div>
);

const DatabaseService = ({ profile, webhookId }: WebhookServiceProps) => (
  <div className="w-full p-6 md:p-4">
    <div className="h-[250px] overflow-clip rounded-[4px] border-[0.33px] border-opus bg-indigo-500">
      <div className="flex h-full flex-col justify-between bg-[url('/svg/pers.svg')] bg-right-bottom bg-no-repeat">
        <Header title="Database" icon={DatabaseIcon} style={"text-cyan-100"} />
        <ActionBar link={`/webhooks/${webhookId}`}>
          <Extra
            value={profile?.webhookCount}
            label="Tables"
            extra={profile?.webhookCount > 1}
          />
        </ActionBar>
      </div>
    </div>
  </div>
);

type HeaderProps = {
  title: string;
  icon: LucideIcon;
  style?: string;
};
const Header = (props: HeaderProps) => {
  return (
    <div className="flex h-[75px] items-center space-x-3 px-4">
      <props.icon size={24} className={cn("text-gray-400", props.style)} />
      <h2
        className={cn(
          "text-xl font-semibold tracking-tighter text-gray-400",
          props.style,
        )}
      >
        {props.title}
      </h2>
    </div>
  );
};

type ActionBarProps = {
  value?: string | number | undefined;
  label?: string | undefined;
  children?: React.ReactNode;
  link: string;
};
const ActionBar = (props: ActionBarProps) => {
  const [loading, setLoading] = useState(false);
  const handleNavigate = () => {
    setLoading(true);
  };
  return (
    <div className="full flex h-[64px] items-center justify-evenly bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-200/10 via-orange-50/10 font-jet text-xs text-cord backdrop-blur-md">
      {props.children}
      <p className="font-thin text-cord/50">|</p>

      <Link href={props.link}>
        <div
          className="group flex items-center justify-center space-x-3 transition-all duration-200"
          onClick={handleNavigate}
        >
          <div className="font-sans text-sm font-semibold tracking-tight text-cyan-100 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:text-zap">
            View Dashboard
          </div>
          <BitFlip
            state={loading}
            one={<LoaderIcon className="size-4 animate-spin text-cyan-100" />}
            zero={
              <ArrowUpRightIcon className="size-4 -translate-x-3 translate-y-1 rotate-45 scale-50 text-zap opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-100 group-hover:text-cyan-50 group-hover:opacity-100" />
            }
          />
        </div>
      </Link>
    </div>
  );
};
type ExtraProps = {
  value?: string | number | undefined;
  label?: string | undefined;
  extra?: string | boolean | undefined;
};
const Extra = (props: ExtraProps) => (
  <div className="flex items-center space-x-2 text-sm">
    <p className="font-bold">{props?.value}</p>
    <p className="text-cord/80">{props?.label}</p>

    <BitFlip state={props?.extra} one={"s"} zero={""} />
  </div>
);

const Container = tw.div`
  flex h-[calc(100vh-218px)] md:h-[640px] w-full
  md:px-6
`;

const Grid = tw.div`
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
`;
