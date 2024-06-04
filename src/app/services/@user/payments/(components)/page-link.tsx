import Link from "next/link";
import { type ReactNode } from "react";

export type PageLinkProps = {
  children: ReactNode;
  id: string | undefined;
  page: string;
};

export const PageLink = (props: PageLinkProps) => {
  return (
    <Link
      href={`/services/payments/${props.page}/${props.id}`}
      className="group"
    >
      <div className="flex w-full items-center justify-center md:active:scale-[95%]">
        <div className="h-fit w-fit rounded-lg border-[0.33px] border-gray-300 bg-neutral-50 p-1 shadow-sm shadow-neutral-200 group-hover:border-sky-600 group-hover:bg-white">
          {props.children}
        </div>
      </div>
    </Link>
  );
};
