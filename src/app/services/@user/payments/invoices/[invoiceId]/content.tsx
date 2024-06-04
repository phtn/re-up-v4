"use client";

import { AuthContext } from "@src/app/(main)/context";
import { prettyDate } from "@src/utils/helpers";
import { LoaderIcon } from "lucide-react";
import { useContext, useMemo } from "react";
import { Header } from "../../(components)/header";
import { PaymentsContext } from "../../(context)/context";
import { getDecimalAmount } from "../../(hooks)/helpers";
import {
  useIcash,
  useInvoiceController,
  type QrResource,
} from "../../(hooks)/invoice";
import {
  DateSettings,
  type DateSetterProps,
} from "./(components)/date-settings";
import { ItemDetails } from "./(components)/item-details";
import { PaymentOptionsTabs } from "./(components)/payment-options";
import { SendActions } from "./(components)/send-action";
import { Container, Title } from "./(components)/styles";
import { Stat } from "./(components)/stats";
import { AmountCell } from "../../(components)/amount-cell";
import { useCallback } from "react";

export const InvoiceContent = ({ id }: { id: string | undefined }) => {
  const userProfile = useContext(AuthContext)?.profile;
  const invoices = useContext(PaymentsContext)?.invoices;

  const { handleGetInvoice, handleSendInvoice } = useInvoiceController();

  const invoice = useMemo(
    () => invoices?.invoiceList?.find((item) => item.id === id),
    [invoices, id],
  );

  const getInvoice = () => {
    handleGetInvoice(invoice?.id);
  };

  const sendInvoice = useCallback(() => {
    const datestring = new Date();
    if (invoice?.id) {
      handleSendInvoice({
        body: {
          cc: ["kimtablizo@gmail.com"],
          finalizedScheduleAt: datestring.toISOString(),
        },
        metadata: { id: invoice?.id },
      });
    }
  }, [invoice?.id, handleSendInvoice]);

  const invoiceDates: DateSetterProps = useMemo(
    () => ({
      invoiceId: invoice?.id,
      currentDueDate: invoice?.dueDate ? new Date(invoice.dueDate) : undefined,
      currentPeriodEnd: invoice?.periodEnd
        ? new Date(invoice.periodEnd)
        : undefined,
      currentPeriodStart: invoice?.periodStart
        ? new Date(invoice.periodStart)
        : undefined,
    }),
    [invoice?.dueDate, invoice?.periodEnd, invoice?.periodStart, invoice?.id],
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

  const gateway = useMemo(() => {
    const handleGenerateQr = () => generateQR(qr_resource);
    return {
      imageUrl,
      loading: icashLoading,
      onGenerate: handleGenerateQr,
      amount: invoice?.total,
      currency: invoice?.currency,
    };
  }, [
    invoice?.total,
    invoice?.currency,
    icashLoading,
    imageUrl,
    generateQR,
    qr_resource,
  ]);

  const copperx = {
    getInvoice,
    sendInvoice,
  };

  return (
    <div className="pr-4 portrait:pr-0">
      <div className="flex items-center justify-between border-b-[0.33px] portrait:px-2">
        <div className="flex items-center space-x-4 portrait:space-x-2">
          <Header title={`Invoice`} />
          <p className="-mb-[3px] font-bold text-dyan/30 portrait:text-sm">#</p>
          <p className="-mb-[3px] flex h-[64px] items-center font-mono uppercase text-dyan/90 portrait:text-xs">
            {id?.substring(0, 13)}
          </p>
        </div>
      </div>

      <Container>
        <div>
          <div className="flex items-center space-x-4">
            <Title text="Overview" />
            {invoices?.fetchingInvoices ? (
              <LoaderIcon className="size-4 animate-spin stroke-1 text-dyan/50" />
            ) : null}
          </div>

          <div className="grid h-[128px] w-full grid-cols-4 gap-4 portrait:h-fit portrait:grid-cols-2 portrait:px-2">
            <Stat
              label="customer"
              value={`${invoice?.customer?.name}@${invoice?.customer.customerNumber}`}
            />
            <Stat label="amount" value={""}>
              <AmountCell total={invoice?.total} currency={invoice?.currency} />
            </Stat>
            <Stat label="status" value={invoice?.status} />
            <Stat
              label="due on "
              value={prettyDate(invoice?.dueDate).substring(
                0,
                prettyDate(invoice?.dueDate).indexOf(" at"),
              )}
            />
          </div>
        </div>
        <ItemDetails items={invoice?.lineItems.data} label={"Item"} />
        <DateSettings {...invoiceDates} />
        <PaymentOptionsTabs gateway={gateway} copperx={copperx} />
        <SendActions email={invoice?.customer?.email} />
      </Container>
    </div>
  );
};
