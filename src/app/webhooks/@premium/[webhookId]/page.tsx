import { DashboardContainer } from "../../(components)/views";
import { DetailContent } from "./detail-content";

type DetailsProps = {
  params: {
    webhookId: string;
  };
};

const WebhookDetails = ({ params }: DetailsProps) => {
  const { webhookId } = params;
  return (
    <DashboardContainer>
      <DetailContent webhookId={webhookId} />
    </DashboardContainer>
  );
};

export default WebhookDetails;
