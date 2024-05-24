"use client";

import { Touch } from "@@ui/touch";
import { opts } from "@src/utils/helpers";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { forwardRef, useCallback, useContext, useState } from "react";
import tw from "tailwind-styled-components";
import { SignInSheet } from "../(login)/sign";
import { AuthContext } from "../(main)/context";
import { UserMenu } from "./user-menu";
import { Button } from "../(ui)/button";
import { getCryptoPrices } from "@src/trpc/crypto/prices";

type TopNavProps = {
  stack?: string[];
};
export const TopNav = () => {
  const creds = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // const TitleOptions = useCallback(() => {
  //   const withStackProps = stack !== undefined;
  //   const options = opts(
  //     <Stack stack={stack} />,
  //     <Stack stack={["Web", "Technologies"]} />,
  //   );
  //   return <>{options.get(withStackProps)}</>;
  // }, [stack]);

  const AuthOptions = useCallback(() => {
    const isAuthed = creds?.user !== null;
    const options = opts(
      <UserMenu user={creds?.profile?.email as string} />,
      <SignInSheet open={open} setOpen={setOpen}>
        <SignIn onClick={() => setOpen} />
      </SignInSheet>,
    );
    return <>{options.get(isAuthed)}</>;
  }, [creds?.user, creds?.profile?.email, open]);

  const handleCrypto = () => {
    getCryptoPrices()
      .then((res) => {
        console.log(res);
      })
      .catch((e: Error) => console.log(e));
  };

  return (
    <nav className="z-5e absolute h-[72px] w-full md:px-[72px]">
      <div className="relative z-50 flex h-full items-center justify-between px-4 md:px-[0px]">
        <Link href="/" role="button" aria-label="home">
          <div className="flex w-full items-center space-x-3">
            <Logo />
            <Stack stack={["RE-UP", ""]} />
          </div>
        </Link>
        <Button onClick={handleCrypto}>get crypto</Button>
        <AuthOptions />
      </div>
    </nav>
  );
};

const SignIn = forwardRef<HTMLButtonElement, { onClick: () => void }>(
  ({ onClick }, ref) => (
    <Touch
      size="sm"
      variant={"ghost"}
      tail={LogInIcon}
      onClick={onClick}
      ref={ref}
      className="font-sans text-sm font-medium tracking-tighter text-void/80"
    >
      {`Sign in`}
    </Touch>
  ),
);
SignIn.displayName = "SignIn";

export const Stack = ({ stack }: TopNavProps) => (
  <div className="text-copper">
    {stack?.map((s, i) => <Title key={i}>{s}</Title>)}
  </div>
);

const Logo = tw.div`
  h-[30px] w-[30px] bg-[url('/svg/new_dark_logo.svg')] bg-contain bg-no-repeat p-[9px]
  `;

const Title = tw.h1`
  text-transparent bg-clip-text from-void/70 via-dyan
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  max-w-[10ch] text-[15px] font-normal leading-[15px] tracking-[2px]
`;
