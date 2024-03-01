"use client";

import { forwardRef, useCallback, useContext, useState } from "react";
import { AuthContext } from "../context";
import Link from "next/link";
import { opts } from "@src/utils/helpers";
import { UserNav } from "./user-nav";
import { Touch } from "../_components/touch";
import { LogInIcon } from "lucide-react";
import { SignInSheet } from "../_sign/sign";

export const Navbar = () => {
  const creds = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const AuthOptions = useCallback(() => {
    const isAuthed = creds?.user !== null;
    const options = opts(
      <UserNav user={creds?.profile?.email as string} />,
      <SignInSheet open={open} setOpen={setOpen}>
        <SignIn onClick={() => setOpen} />
      </SignInSheet>,
    );
    return <>{options.get(isAuthed)}</>;
  }, [creds?.user, creds?.profile?.email, open]);

  return (
    <nav className="bg-zap absolute z-50 h-[72px] w-full md:px-[72px]">
      <div className="relative z-50 flex h-full items-center justify-between px-4 md:px-[36px]">
        <Link href="/" role="button" aria-label="home">
          <div className="flex w-full items-center space-x-3">
            <div className="h-[30px] w-[30px] bg-[url('/svg/logo.svg')] bg-contain bg-no-repeat p-[9px]"></div>
            <h1 className="text-void max-w-[8ch] text-sm font-medium leading-[15px] tracking-tight">
              Web Services
            </h1>
          </div>
        </Link>
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
    >
      {`Sign in`}
    </Touch>
  ),
);
SignIn.displayName = "SignIn";
