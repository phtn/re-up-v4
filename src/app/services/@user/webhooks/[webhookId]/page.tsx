import { PageContent } from "./(components)/content";
import { WebhookNav } from "./(components)/nav";

export type DefaultContentProps = {
  params: {
    webhookId: string;
  };
};
const WebhookPage = ({ params }: DefaultContentProps) => {
  console.log(params);
  return (
    <div>
      <div className="h-[72px] w-full bg-void">
        <WebhookNav webhookId={params.webhookId} />
      </div>
      <div className="w-full">
        <PageContent />
      </div>
    </div>
  );
};

export default WebhookPage;
