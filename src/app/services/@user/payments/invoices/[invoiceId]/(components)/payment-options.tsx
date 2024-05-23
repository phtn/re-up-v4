import { Button } from "@src/app/(ui)/button";
import { LoaderIcon, QrCodeIcon } from "lucide-react";
import Image from "next/image";

type PaymentOptionProps = {
  loading: boolean;
  onGenerate: () => void;
  imageUrl: string | undefined;
};
export const PaymentOptions = ({
  imageUrl,
  loading,
  onGenerate,
}: PaymentOptionProps) => {
  return (
    <div className="h-[364px] w-full">
      <div className="flex items-center space-x-4 py-2">
        <p className="text-sm font-medium tracking-tighter text-dyan/80">
          Payment Options
        </p>
        <Button
          disabled={!!imageUrl || loading}
          onClick={onGenerate}
          className="h-[32px] border-[0.33px] border-indigo-400 bg-indigo-50 p-1 px-2 text-xs text-indigo-500/90 hover:text-indigo-600"
        >
          Generate QR
        </Button>
        {loading ? (
          <LoaderIcon className="size-4 animate-spin text-indigo-500" />
        ) : null}
      </div>

      <div className=" grid h-[260px] w-full grid-cols-6 gap-4">
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
        <div className="col-span-4 flex items-center justify-center rounded border-[0.33px] border-dyan/20 shadow-sm">
          direct
        </div>
      </div>
    </div>
  );
};
