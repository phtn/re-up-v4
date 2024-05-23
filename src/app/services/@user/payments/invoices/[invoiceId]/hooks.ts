import { type UpdatePaymentInternalSchema } from "@src/server/resource/payments/updates";
import { updatePaymentInternal } from "@src/trpc/internal/payments/updates";
import { errHandler } from "@src/utils/helpers";
import { onSuccess } from "@src/utils/toast";
import { useState } from "react";

type InvoiceUpdateHookParams = {
  invoiceId: string | undefined;
  userId: string | undefined;
};
export const useInvoiceUpdate = ({}: InvoiceUpdateHookParams) => {
  const [updateLoading, setLoading] = useState(false);

  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [periodEnd, setPeriodEnd] = useState<Date | undefined>();
  const [periodStart, setPeriodStart] = useState<Date | undefined>();

  const handleDateUpdate = (resource: UpdatePaymentInternalSchema) => () => {
    setLoading(true);
    updatePaymentInternal(resource)
      .then(() => {
        setLoading(false);
        onSuccess("Changes saved.", "success");
      })
      .catch((e: Error) => errHandler(e, setLoading));
  };

  return {
    dueDate,
    setDueDate,
    periodEnd,
    setPeriodEnd,
    periodStart,
    updateLoading,
    setPeriodStart,
    handleDateUpdate,
  };
};
