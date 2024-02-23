"use client";

import { auth } from "@src/lib/db";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

export const CheckAuth = () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (observer) => {
      if (!observer) {
        router.push("/");
      }
    });
  }, [router]);
  return <div />;
};
