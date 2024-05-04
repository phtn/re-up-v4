import { DashboardContainer } from "@src/app/(ui)/view";
import { DetailContent } from "./(endpoint)/endpoint";

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
