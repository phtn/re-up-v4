import { DashboardContainer } from "../../../(components)/views";
import { DetailContent } from "./endpoint";

type DetailsProps = {
  params: {
    endpointId: string;
  };
};

const EndpointDetails = ({ params }: DetailsProps) => {
  const { endpointId } = params;
  return (
    <DashboardContainer>
      <DetailContent endpointId={endpointId} />
    </DashboardContainer>
  );
};

export default EndpointDetails;
