"use client";

import { useCallback, useContext } from "react";
import { AuthContext } from "../context";
import Link from "next/link";
import { opts } from "@src/utils/helpers";

export const Navbar = () => {
  const creds = useContext(AuthContext);

  const AuthOptions = useCallback(() => {
    const isAuthed = creds?.user !== null;
    const options = opts(
      <h2 className="text-xs">{creds?.profile?.email}</h2>,
      <h2 className="text-xs">Sign In</h2>,
    );
    return <>{options.get(isAuthed)}</>;
  }, [creds?.user, creds?.profile?.email]);

  return (
    <nav className=" h-[72px] bg-zap md:px-[72px]">
      <div className="relative z-50 flex h-full items-center justify-between px-4 md:px-10">
        <Link href="/" role="button" aria-label="home">
          <div className="flex w-full items-center space-x-3">
            <div className="h-[30px] w-[30px] bg-[url('/svg/logo.svg')] bg-contain bg-no-repeat p-[9px]"></div>
            <h1 className="max-w-[8ch] text-sm font-medium leading-[15px] tracking-tight text-void">
              Web Services
            </h1>
          </div>
        </Link>
        <AuthOptions />
      </div>
    </nav>
  );
};
