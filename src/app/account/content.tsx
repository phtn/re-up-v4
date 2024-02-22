"use client";

import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@src/lib/db";
import { ArrowRightIcon, BookOpenTextIcon, WebhookIcon } from "lucide-react";
import tw from "tailwind-styled-components";
import { DarkTouch, Touch } from "../_components/touch";
import { opts } from "@src/utils/helpers";
import { Pricing } from "./pricing";
import { SignInSheet } from "../_sign/sign";

export const Content = () => {
  const creds = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (observer) => {
      if (!observer) {
        router.push("/");
      }
    });
  }, [creds?.user, router]);

  const [createActive, setCreateActive] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);

  const handleCreate = () => {
    setCreateActive(true);
  };

  const ViewOptions = useCallback(() => {
    const options = opts(<div />, <Cover />);
    return <>{options.get(createActive)}</>;
  }, [createActive]);

  const ActionOptions = useCallback(() => {
    const isAuthed = creds?.user !== null;
    const options = opts(
      <CreateButton onClick={handleCreate} />,
      <SignInSheet open={signinOpen} setOpen={setSigninOpen}>
        <CreateButton onClick={() => setSigninOpen(true)} />
      </SignInSheet>,
    );
    return <>{options.get(isAuthed)}</>;
  }, [creds?.user, signinOpen]);

  return (
    <div className="flex h-full">
      <div className="w-full space-y-8 border-r border-lux px-[108px]">
        <div className="grid h-[500px] w-full grid-cols-1 gap-x-[36px] bg-void px-[36px] md:grid-cols-2 md:px-[72px]">
          <div className="flex items-center justify-center">
            <div className="flex w-full flex-col space-y-10">
              <div className="flex items-center space-x-6">
                <WebhookIcon className="h-10 w-10 text-kindle" />
                <h2 className="text-5xl font-bold tracking-tight text-sky-50">
                  Webhooks
                </h2>
              </div>
              <div className="flex h-full w-full flex-col justify-center space-y-6 text-sm text-neutral-400/80">
                <div className="space-y-2">
                  <Title>definition</Title>
                  <p className="text-upos max-w-[52ch] text-[11px] font-light leading-snug">
                    A Webhook is a technology used in web applications that
                    allows real-time communication between different
                    applications or systems.
                  </p>
                </div>
                <div className="space-y-1">
                  <Title>use cases</Title>
                  <p className="text-xs">
                    Payments &middot; Sales &middot; Logistics &middot; AI
                  </p>
                </div>
              </div>
              <div className="flex w-fit items-center space-x-4">
                <ActionOptions />
                <DarkTouch size={"md"} tail={BookOpenTextIcon}>
                  View Docs
                </DarkTouch>
              </div>
            </div>
          </div>
          <ViewOptions />
        </div>

        <Pricing />
      </div>
    </div>
  );
};

const CreateButton = ({ onClick }: { onClick: () => void }) => (
  <Touch size={"md"} variant="tertiary" tail={ArrowRightIcon} onClick={onClick}>
    Create Webhook
  </Touch>
);

const Title = tw.p`
text-xs font-bold uppercase text-cord
`;

const Cover = tw.div`
 flex items-center justify-center bg-[url('/svg/chaos_v2.svg')] bg-cover
`;
