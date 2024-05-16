"use client";

import { TheTip } from "@src/app/(ui)/just-the-tip";
import { GlobeIcon, Link2Icon, LoaderIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { memo, useCallback } from "react";
import { WebhookNav } from "../../(components)/nav";
import { columns } from "./attempts/column";
import { DataTable } from "./attempts/data-table";
import { Card } from "./card";
import {
  useActiveControls,
  useEndpointInterface,
  useFirebaseWebhook,
  useMessageAttempInterface,
} from "../(hooks)";
import tw from "tailwind-styled-components";
import { cn } from "@src/utils/cn";

type DetailContentProps = {
  endpointId: string;
};

export const DetailContent = memo(({ endpointId }: DetailContentProps) => {
  const pathName = usePathname();
  const webhookId = pathName.split("/")[3];

  const { attempts } = useMessageAttempInterface({
    app_id: `${webhookId}`,
    endpoint_id: endpointId,
  });

  const { endpoint } = useEndpointInterface({
    app_id: `${webhookId}`,
    endpoint_id: endpointId,
  });

  const { getEndpointById } = useFirebaseWebhook({
    app_id: webhookId,
  });

  const { copy } = useActiveControls();

  const UrlLoader = useCallback(() => {
    if (!endpoint?.url)
      return (
        <LoaderIcon className="size-4 animate-spin stroke-[1px] text-cord/50" />
      );

    return <p className="font-jet font-thin text-cord/50">|</p>;
  }, [endpoint?.url]);

  return (
    <div>
      <div className="h-[72px] w-full bg-void">
        <WebhookNav webhookId={`${webhookId}`} />
      </div>
      <div className="h-fit w-full bg-void">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="h-fit w-full border-opus/30 md:h-[586px] md:border-r-[0.33px]">
            <Card
              endpoint={endpoint}
              id={endpoint?.id}
              tag="endpoint"
              title={"Endpoint"}
              name={getEndpointById(endpointId)?.name}
              extra={endpoint?.url}
              description={endpoint?.description}
              icon={Link2Icon}
              iconStyle="-rotate-45"
              actionIcon={Link2Icon}
              onClick={copy("endpoint id", endpoint?.id, "success")}
            />
          </div>

          <div className="col-span-2 h-fit overflow-scroll border-t-[0.33px] border-opus/30 md:h-fit">
            <div className="flex-1 flex-col space-y-4 md:flex">
              <DataTable
                data={attempts}
                loading={!!attempts}
                columns={columns}
              />
            </div>
          </div>
        </div>
        <div className="flex h-[56px] w-full items-center space-x-4 border-t-[0.33px] border-opus/30 pl-4 md:pl-6">
          <GlobeIcon className="size-4 min-w-4 stroke-[2px] text-cord/60" />
          <p className="whitespace-nowrap font-sans text-[13px] font-semibold tracking-tight text-gray-300">
            Endpoint URL
          </p>
          <UrlLoader />
          <div
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all delay-100 duration-500 ease-in",
              endpoint?.url ? `w-full` : `w-0`,
            )}
          >
            <TheTip tip="click to copy">
              <Url onClick={copy("endpoint url", endpoint?.url)}>
                {endpoint?.url}
              </Url>
            </TheTip>
          </div>
        </div>
      </div>
    </div>
  );
});
DetailContent.displayName = "DetailContent";

const Url = tw.p`
  font-jet text-[12px] font-light text-opus
  hover:text-ash transition-all duration-200
  ease-in
  `;
