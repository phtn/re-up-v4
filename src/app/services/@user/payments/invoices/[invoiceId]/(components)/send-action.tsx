import { Button } from "@src/app/(ui)/button";
import { SendIcon } from "lucide-react";
import { Subtext } from "./styles";

type SendActionProps = {
  email: string | undefined;
};
export const SendActions = ({ email }: SendActionProps) => {
  return (
    <div className="flex h-[60px] items-center justify-between">
      <div className="flex items-center space-x-16">
        <div>
          <p className="font-semibold tracking-tight text-dyan">{email}</p>
          <Subtext>Customer billing email</Subtext>
        </div>
        <div></div>
      </div>
      <Button
        variant={"default"}
        className="space-x-2 bg-sky-500 px-4 text-white"
      >
        <p>Save and send</p>
        <SendIcon size={14} />
      </Button>
    </div>
  );
};
