"use client";

import { DarkTouch, Touch } from "@@ui/touch";
import { SignInSheet } from "@src/app/(login)/sign";
import { AuthContext } from "@src/app/(main)/context";
import { type Children } from "@src/app/(main)/types";
import { opts } from "@src/utils/helpers";
import { ArrowRightIcon, BookOpenTextIcon, WebhookIcon } from "lucide-react";
import { forwardRef, useCallback, useContext, useState } from "react";
import tw from "tailwind-styled-components";
import { WebhookCreate } from "./create/webhook-create";

/**
 * @name WebhookLanding
 * @description Default content for the webhook page
 * @location /webhooks/(components)/landing-page.tsx
 */
export const WebhookLanding = () => {
  const user = useContext(AuthContext)?.user;
  const [userId] = useState<string | undefined>(user?.uid);
  const [createActive, setCreateActive] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);

  const Secondary = useCallback(() => {
    const options = opts(<WebhookCreate userId={userId} />, <Cover />);
    return <>{options.get(createActive)}</>;
  }, [createActive, userId]);

  const ActionOptions = useCallback(() => {
    const isAuthed = userId !== undefined;
    const handleCreate = () => {
      if (userId) {
        setCreateActive(true);
      }
    };

    const options = opts(
      <CreateButton onClick={handleCreate} />,
      <SignInSheet open={signinOpen} setOpen={setSigninOpen}>
        <CreateButton onClick={handleCreate} />
      </SignInSheet>,
    );
    return <>{options.get(isAuthed)}</>;
  }, [userId, signinOpen]);

  return (
    <Hero>
      <Primary>
        <ActionOptions />
      </Primary>
      <Secondary />
    </Hero>
  );
};

const Primary = ({ children }: Children) => (
  <div className="flex h-[500px] items-center justify-center">
    <div className="flex w-full flex-col space-y-12">
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
      <p className="text-upos max-w-[52ch] text-[12px] font-light leading-snug">
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
  grid h-fit w-full grid-cols-1 bg-void px-[16px] md:grid-cols-2 md:px-[72px]
`;

const Title = tw.p`
  text-xs font-bold uppercase text-cord
`;

const Cover = tw.div`
  flex portrait:h-[400px] md:h-[500px] items-center justify-center bg-[url('/svg/chaos_v2.svg')] bg-cover
`;
