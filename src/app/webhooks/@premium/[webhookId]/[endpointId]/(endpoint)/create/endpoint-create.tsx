import tw from "tailwind-styled-components";
import { EndpointForm } from "./endpoint-form";
import { type EndpointCreateProps } from "../types";

export const EndpointCreate = ({ webhookId }: EndpointCreateProps) => {
  return (
    <div className="flex h-full items-start justify-center border-whb/20 md:items-center md:border-l-[0.33px]">
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="flex h-[100px] flex-col items-center justify-center space-y-3">
          <h3 className="text-xl font-semibold text-sky-50">
            Create a new endpoint.
          </h3>
          <Hint>Give your endpoint a name and a brief description.</Hint>
        </div>
        <div className="w-full">
          <EndpointForm webhookId={webhookId} />
        </div>
      </div>
    </div>
  );
};

const Hint = tw.p`
  text-xs text-kindle font-medium max-w-[28ch]
`;
