import tw from "tailwind-styled-components";
import { WebhookForm } from "./webhook-form";
import { type UserIdSchema } from "@src/server/resource/account";

type WebhookCreateProps = {
  userId: UserIdSchema;
};

export const WebhookCreate = ({ userId }: WebhookCreateProps) => {
  return (
    <div className="border-whb/20 flex h-[500px] items-start justify-center md:items-center md:border-l-[0.33px]">
      <div className="flex flex-col items-center justify-center space-y-4 p-10">
        <div className="flex flex-col space-y-3">
          <h3 className="text-3xl font-semibold text-sky-50">
            Let&apos;s get started!
          </h3>
          <Title>First, let&apos;s give your webhook a name</Title>
          <Description>
            Some teams name their webhooks specific to what it does. Others name
            it after the project or company, but you can name it to whatever you
            want.
          </Description>
        </div>
        <WebhookForm uid={userId} />
      </div>
    </div>
  );
};

const Title = tw.p`
  text-sm text-kindle font-medium
`;

const Description = tw.p`
  text-opus text-[12px] max-w-[35ch] font-light leading-snug
`;
