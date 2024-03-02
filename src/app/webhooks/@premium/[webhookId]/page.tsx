type DetailsProps = {
  params: {
    webhookId: string;
  };
};

const WebhookDetails = ({ params }: DetailsProps) => {
  const { webhookId } = params;
  return (
    <div>
      <h1>Webhook {webhookId}</h1>
    </div>
  );
};

export default WebhookDetails;
