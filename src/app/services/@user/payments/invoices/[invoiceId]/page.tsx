import { InvoiceContent } from "./content";

export type InvoicePageProps = {
  params: {
    invoiceId: string | undefined;
  };
};
const InvoicePage = ({ params }: InvoicePageProps) => {
  const { invoiceId } = params;
  return <InvoiceContent id={invoiceId} />;
};
export default InvoicePage;
