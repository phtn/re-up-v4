import tw from "tailwind-styled-components";
import { WebhookForm } from "./webhook-form";

export const WebhookCreate = () => {
  return (
    <div className="flex  items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 border-[0.33px] p-10">
        <div className="flex flex-col space-y-2">
          <h3 className="text-3xl font-semibold text-sky-50">Perfect!</h3>
          <Title>First, let&apos;s give your webhook a name</Title>
          <Description>
            Most people name their webhooks specific to what it the does. Some
            name it after the project name or a company, but you can name it
            whatever you want.
          </Description>
        </div>
        <WebhookForm />
      </div>
    </div>
  );
};

const Title = tw.p`
  text-sm font-medium text-kindle
`;

const Description = tw.p`
  text-opus text-[11px] max-w-[40ch] font-light leading-snug

`;
