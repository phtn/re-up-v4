import { Button } from "@src/app/(ui)/button";
import { LoaderIcon, QrCodeIcon } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/app/(ui)/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/app/(ui)/tabs";
import { Title } from "./styles";
import tw from "tailwind-styled-components";
import { cn } from "@src/utils/cn";
import { AmountCell } from "../../../(components)/amount-cell";
import { type CurrencySchema } from "@src/server/resource/copperx/common";

type PaymentGatewayProps = {
  loading: boolean;
  onGenerate: () => void;
  imageUrl: string | undefined;
  amount: string | undefined;
  currency: string | undefined;
};
type CopperxProps = {
  getInvoice: () => void;
  sendInvoice: () => void;
};

type PaymentOptionProps = {
  gateway: PaymentGatewayProps;
  copperx: CopperxProps;
};

export const PaymentOptionsTabs = ({
  gateway,
  copperx,
}: PaymentOptionProps) => {
  return (
    <div>
      <Tabs defaultValue="gateway" className="w-full">
        <div className="flex items-center space-x-4 py-4">
          <div className="w-fit whitespace-nowrap">
            <Title text="Payment Options" />
          </div>
          <TabContainer>
            <Trigger value="gateway">Payment Gateway</Trigger>
            <Trigger value="direct">Direct Payment</Trigger>
            <Trigger value="help">Help</Trigger>
          </TabContainer>
        </div>
        <PaymentGateway {...gateway} {...copperx} />
        <DirectPayment />
      </Tabs>
    </div>
  );
};

const PaymentGateway = (props: PaymentGatewayProps & CopperxProps) => {
  const { imageUrl } = props;
  return (
    <TabContent value="gateway">
      <TabCard>
        <CardContent className="grid h-[400px] grid-cols-3 gap-x-6 px-0">
          <IcashCard>
            <Header logo=" bg-[url('/images/icash.png')]" subtext="Payments" />
            <Qr imageUrl={imageUrl} />
            <Generate {...props} />
          </IcashCard>

          <CopperxCard>
            <TabCardHeader>
              <div className="flex items-center justify-between pb-1">
                <div className="h-[36px] w-[180px] border-0 bg-[url('/svg/copperx.svg')] bg-contain bg-no-repeat" />
                <TabCardTitle className="font-bold text-indigo-50">
                  <span className="px-2 text-[14px] font-light tracking-tight">
                    Global Crypto
                  </span>
                </TabCardTitle>
              </div>
            </TabCardHeader>
            <QrContainer>
              {imageUrl ? //   className="h-[200px] w-auto" //   height={0} //   width={0} //   alt="qrcode" //   src={imageUrl} // <Image
              // />
              null : (
                <QrCodeIcon className="fill-indigo-50/50 stroke-1 text-indigo-500/70" />
              )}
            </QrContainer>
            <div className="space-y-2">
              <Button
                disabled={false}
                onClick={props.getInvoice}
                className="h-[36px] w-full border-[0.33px] border-indigo-400 bg-white p-1 px-2 text-xs text-indigo-500/90 hover:text-indigo-600 disabled:opacity-100"
              >
                Get Invoice
              </Button>
              <Button
                disabled={false}
                onClick={props.sendInvoice}
                className="h-[36px] w-full border-[0.33px] border-indigo-400 bg-white p-1 px-2 text-xs text-indigo-500/90 hover:text-indigo-600 disabled:opacity-100"
              >
                Send Invoice
              </Button>
            </div>
          </CopperxCard>
        </CardContent>
        <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
      </TabCard>
    </TabContent>
  );
};

const DirectPayment = () => {
  return (
    <TabContent value="direct">
      <TabCard>
        <TabCardHeader>
          <TabCardTitle>Direct Payment</TabCardTitle>
          <CardDescription></CardDescription>
        </TabCardHeader>
        <CardContent className="space-y-2"></CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </TabCard>
    </TabContent>
  );
};

type HeaderProps = {
  logo: string;
  subtext: string;
};
const Header = (props: HeaderProps) => {
  return (
    <TabCardHeader>
      <div className="flex items-center justify-between pb-1">
        <div
          className={cn(
            props.logo,
            "h-[36px] w-[180px] bg-contain bg-no-repeat",
          )}
        />
        <TabCardTitle className="font-bold text-blue-500">
          <span className="px-2 text-[14px] font-light tracking-tight">
            {props.subtext}
          </span>
        </TabCardTitle>
      </div>
    </TabCardHeader>
  );
};

const Qr = ({ imageUrl }: { imageUrl: string | undefined }) => {
  return (
    <QrContainer>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="qrcode"
          width={0}
          height={0}
          className="h-[200px] w-auto"
        />
      ) : (
        <QrCodeIcon className="text-icash-500/60 fill-icash/20 stroke-1" />
      )}
    </QrContainer>
  );
};

const Generate = (props: PaymentGatewayProps) => {
  const { amount, currency, imageUrl, loading, onGenerate } = props;
  return (
    <div>
      <div className="flex items-start justify-between px-1 py-2">
        <p className=" font-medium tracking-tight text-dyan/60">Amount</p>
        {currency ? (
          <AmountCell
            total={parseInt(amount!).toString()}
            currency={(currency as CurrencySchema) ?? "btc"}
          />
        ) : null}
        {/* <p className="text-lg font-semibold tracking-tighter text-[#0000FF]">
          {amount}
        </p> */}
      </div>
      <Button
        disabled={!!imageUrl || loading}
        onClick={onGenerate}
        className="h-[36px] w-full border-[0.33px] border-teal-400 bg-white p-1 px-2 text-xs text-teal-500/90 hover:text-teal-600 disabled:opacity-100"
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <p>Generating...</p>
            <LoaderIcon className="size-4 animate-spin text-slate-400" />
          </div>
        ) : imageUrl ? (
          "QR Generated"
        ) : (
          "Generate QR"
        )}
      </Button>
    </div>
  );
};

const TabContainer = tw(TabsList)`
  bg-ghost grid w-fit grid-cols-3 rounded-lg border-[0.33px] border-dyan/10 p-1
  `;
const Trigger = tw(TabsTrigger)`
  h-full rounded-md bg-white border-ash text-sm
  data-[state=inactive]:text-dyan/70 data-[state=active]:text-sky-500
  data-[state=inactive]:bg-transparent data-[state=active]:border-[0.33px]
  data-[state=active]:shadow-sm

  `;

const TabContent = tw(TabsContent)`
  h-[500px]
  `;

const TabCard = tw(Card)`
  border-0 shadow-none
  `;

const TabCardHeader = tw(CardHeader)`
  px-0 py-0.5
  `;

const TabCardTitle = tw(CardTitle)`
  text-lg text-dyan
  `;

const IcashCard = tw.div`
  w-fit h-full bg-ghost p-6 space-y-2
  rounded-lg border-[0.33px] border-dyan/20
  `;

const CopperxCard = tw.div`
  w-fit h-full
  bg-gradient-to-b from-indigo-500 to-indigo-50
  text-white rounded-lg p-6
  `;

const QrContainer = tw.div`
  flex size-[300px] items-center justify-center rounded border-[0.33px] border-indigo-600/20 bg-white
  `;
