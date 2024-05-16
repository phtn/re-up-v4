import { CustomerContent } from "./content";

export type CustomerPageProps = {
  params: {
    customerId: string;
  };
};
const CustomerPage = ({ params }: CustomerPageProps) => {
  const { customerId } = params;
  return <CustomerContent id={customerId} />;
};
export default CustomerPage;
