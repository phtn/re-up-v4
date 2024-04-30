import { PageContent } from "./(components)/content";
import { WebhookNav } from "./(components)/navbar";

export type DefaultContentProps = {
  params: {
    webhookId: string;
  };
};
const WebhookDefault = ({ params }: DefaultContentProps) => {
  return (
    <div>
      <div className="h-[72px] w-full bg-void">
        <WebhookNav webhookId={params.webhookId} />
      </div>
      <div className="h-[628px] w-full">
        <PageContent />
      </div>
    </div>
  );
};

export default WebhookDefault;
