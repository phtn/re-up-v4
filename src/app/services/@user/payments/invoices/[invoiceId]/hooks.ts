import { useState } from "react";

export const useInvoiceUpdate = () => {
  // const [updateLoading, setLoading] = useState(false);

  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [periodEnd, setPeriodEnd] = useState<Date | undefined>();
  const [periodStart, setPeriodStart] = useState<Date | undefined>();

  const handleDateUpdate = () => {
    console.log(dueDate, periodEnd, periodStart);
  };

  return {
    dueDate,
    setDueDate,
    periodEnd,
    setPeriodEnd,
    periodStart,
    setPeriodStart,
    handleDateUpdate,
  };
};
