// "use client";

// import { opts } from "@src/utils/helpers";
// import { ArrowRightIcon, BookOpenTextIcon, WebhookIcon } from "lucide-react";
// import { forwardRef, useCallback, useContext, useState } from "react";
// import tw from "tailwind-styled-components";
// import { DarkTouch, Touch } from "../_components/touch";
// import { SignInSheet } from "../_sign/sign";
// import { AuthContext } from "../context";
// import { type Children } from "../types";
// import { Webhook } from "../webhooks/dashboard";
// import { ViewContainer } from "./components";
// import { WebhookCreate } from "./webhook-create";

// export const Content = () => {
//   const user = useContext(AuthContext)?.user;
//   const profile = useContext(AuthContext)?.profile;
//   const [userId] = useState<string | undefined>(user?.uid);
//   const [createActive, setCreateActive] = useState(false);
//   const [signinOpen, setSigninOpen] = useState(false);

//   const Secondary = useCallback(() => {
//     const options = opts(<WebhookCreate />, <Cover />);
//     return <>{options.get(createActive)}</>;
//   }, [createActive]);

//   const ActionOptions = useCallback(() => {
//     const isAuthed = userId !== undefined;
//     const handleCreate = () => {
//       if (userId) {
//         setCreateActive(true);
//       }
//     };

//     const options = opts(
//       <CreateButton onClick={handleCreate} />,
//       <SignInSheet open={signinOpen} setOpen={setSigninOpen}>
//         <CreateButton onClick={handleCreate} />
//       </SignInSheet>,
//     );

//     return <>{options.get(isAuthed)}</>;
//   }, [userId, signinOpen]);

//   const WebhookViewOptions = useCallback(() => {
//     const withWebhook = profile?.webhookCount !== 0;
//     const options = opts(
//       <WebhookDashboard />,
//       <Hero>
//         <Primary>
//           <ActionOptions />
//         </Primary>
//         <Secondary />
//       </Hero>,
//     );
//     return <>{options.get(withWebhook)}</>;
//   }, [profile?.webhookCount, ActionOptions, Secondary]);

//   return (
//     <ViewContainer>
//       <WebhookViewOptions />
//     </ViewContainer>
//   );
// };

// const Primary = ({ children }: Children) => (
//   <div className="flex h-[500px] items-center justify-center">
//     <div className="flex w-full flex-col space-y-12">
//       <IntroTitle />
//       <IntroDetails />
//       <div className="flex w-fit items-center space-x-4 portrait:w-full">
//         {children}
//         <DarkTouch
//           size={"md"}
//           tail={BookOpenTextIcon}
//           className="portrait:w-full"
//         >
//           View Docs
//         </DarkTouch>
//       </div>
//     </div>
//   </div>
// );

// const IntroTitle = () => (
//   <div className="flex items-center space-x-6 px-4 md:px-0">
//     <WebhookIcon className="text-kindle h-8 w-8 md:h-10 md:w-10" />
//     <h2 className="text-4xl font-bold tracking-tight text-sky-50 md:text-5xl">
//       Webhooks
//     </h2>
//   </div>
// );

// const IntroDetails = () => (
//   <div className="flex h-full w-full flex-col justify-center space-y-6 text-sm text-neutral-400/80">
//     <div className="space-y-2">
//       <Title>definition</Title>
//       <p className="text-upos max-w-[52ch] text-[12px] font-light leading-snug">
//         A Webhook is a technology used in web applications that allows real-time
//         communication between different applications or systems.
//       </p>
//     </div>
//     <div className="space-y-1">
//       <Title>use cases</Title>
//       <p className="text-xs">
//         Payments &middot; Sales &middot; Logistics &middot; AI
//       </p>
//     </div>
//   </div>
// );

// const CreateButton = forwardRef<HTMLButtonElement, { onClick: () => void }>(
//   ({ onClick }, ref) => (
//     <Touch
//       size={"md"}
//       variant="tertiary"
//       tail={ArrowRightIcon}
//       ref={ref}
//       onClick={onClick}
//     >
//       Create Webhook
//     </Touch>
//   ),
// );
// CreateButton.displayName = "CreateButton";

// const Hero = tw.div`
//   grid h-fit w-full grid-cols-1 bg-void px-[16px] md:grid-cols-2 md:px-[72px]
// `;

// const Title = tw.p`
//   text-xs font-bold uppercase text-cord
// `;

// const Cover = tw.div`
//   flex portrait:h-[400px] md:h-[500px] items-center justify-center bg-[url('/svg/chaos_v2.svg')] bg-cover
// `;
