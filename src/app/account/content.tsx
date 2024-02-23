"use client";

import {
  type ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";
import { AuthContext } from "../context";
import { ArrowRightIcon, BookOpenTextIcon, WebhookIcon } from "lucide-react";
import tw from "tailwind-styled-components";
import { DarkTouch, Touch } from "../_components/touch";
import { opts } from "@src/utils/helpers";
import { Pricing } from "./pricing";
import { SignInSheet } from "../_sign/sign";
import { WebhookCreate } from "./webhook-create";

export const Content = () => {
  const creds = useContext(AuthContext);

  const [createActive, setCreateActive] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);

  const handleCreate = () => {
    setCreateActive(true);
  };

  const Secondary = useCallback(() => {
    const options = opts(<WebhookCreate />, <Cover />);
    return <>{options.get(createActive)}</>;
  }, [createActive]);

  const ActionOptions = useCallback(() => {
    const isAuthed = creds?.user !== null;
    const options = opts(
      <CreateButton onClick={handleCreate} />,
      <SignInSheet open={signinOpen} setOpen={setSigninOpen}>
        <CreateButton onClick={handleCreate} />
      </SignInSheet>,
    );
    return <>{options.get(isAuthed)}</>;
  }, [creds?.user, signinOpen]);

  return (
    <div className="flex h-fit">
      <div className="w-full space-y-8 md:px-[108px]">
        <Hero>
          <Primary>
            <ActionOptions />
          </Primary>
          <Secondary />
        </Hero>
        <Pricing />
      </div>
    </div>
  );
};

const Primary = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-center">
    <div className="flex w-full flex-col space-y-10">
      <IntroTitle />
      <IntroDetails />
      <div className="flex w-fit items-center space-x-4 portrait:w-full">
        {children}
        <DarkTouch
          size={"md"}
          tail={BookOpenTextIcon}
          className="portrait:w-full"
        >
          View Docs
        </DarkTouch>
      </div>
    </div>
  </div>
);

const IntroTitle = () => (
  <div className="flex items-center space-x-6 px-4 md:px-0">
    <WebhookIcon className="h-8 w-8 text-kindle md:h-10 md:w-10" />
    <h2 className="text-4xl font-bold tracking-tight text-sky-50 md:text-5xl">
      Webhooks
    </h2>
  </div>
);

const IntroDetails = () => (
  <div className="flex h-full w-full flex-col justify-center space-y-6 text-sm text-neutral-400/80">
    <div className="space-y-2">
      <Title>definition</Title>
      <p className="text-upos max-w-[52ch] text-[11px] font-light leading-snug">
        A Webhook is a technology used in web applications that allows real-time
        communication between different applications or systems.
      </p>
    </div>
    <div className="space-y-1">
      <Title>use cases</Title>
      <p className="text-xs">
        Payments &middot; Sales &middot; Logistics &middot; AI
      </p>
    </div>
  </div>
);

const CreateButton = forwardRef<HTMLButtonElement, { onClick: () => void }>(
  ({ onClick }, ref) => (
    <Touch
      size={"md"}
      variant="tertiary"
      tail={ArrowRightIcon}
      ref={ref}
      onClick={onClick}
    >
      Create Webhook
    </Touch>
  ),
);

CreateButton.displayName = "CreateButton";

const Hero = tw.div`
  grid h-[900px] md:h-[500px] w-full grid-cols-1 portrait:gap-y-8 gap-x-[36px] bg-void px-[16px] md:grid-cols-2 md:px-[72px]
`;

const Title = tw.p`
  text-xs font-bold uppercase text-cord
`;

const Cover = tw.div`
 flex items-center justify-center bg-[url('/svg/chaos_v2.svg')] bg-cover
`;
