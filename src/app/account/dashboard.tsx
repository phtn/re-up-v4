"use client";

import tw from "tailwind-styled-components";
import { ArrowUpRightIcon, WebhookIcon } from "lucide-react";
import { Touch } from "@src/app/_components/touch";
import { useAccountInfo } from "./hooks";
import Link from "next/link";

/**
 * @component
 * @name AccountDashboard
 * @description - a component that displays the user's webhooks and active apps.
 */
export const AccountDashboard = () => {
  const { profile } = useAccountInfo();
  return (
    <div className="bg-void p-8 md:h-[500px] portrait:h-[400px]">
      <Container>
        <div className="">
          <div className="bg-darkmojo">
            <div className="flex h-[75px] items-center space-x-4 px-4">
              <WebhookIcon size={24} className="text-void" />
              <h2 className="text-void text-lg font-bold">Webhooks</h2>
            </div>
            <div className="flex h-[100px] items-center justify-center">
              <p className="text-opus text-xs">no recent activity</p>
            </div>
          </div>
          <div className="border-opus flex h-[50px] items-center space-x-3 border-[0.33px] px-4">
            <p className="text-mojo font-mono text-3xl font-thin">
              {profile?.webhookCount}
            </p>
            <div className="space-y-[2px]">
              <p className="text-darkmojo font-mono text-[11px] leading-none">
                active
              </p>
              <p className="text-darkmojo font-mono text-[11px] leading-none">
                apps
              </p>
            </div>
          </div>
          <div className="border-opus border-[0.33px] border-t-0">
            <Link href="/webhooks">
              <Touch
                size={"lg"}
                className="text-darkmojo"
                variant={"ghost"}
                tail={ArrowUpRightIcon}
              >
                View Dashboard
              </Touch>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
const Container = tw.div`
  grid h-fit w-full gap-4 grid-cols-1 md:grid-cols-3
`;
