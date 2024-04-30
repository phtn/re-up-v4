"use client";

import { auth, db } from "@@lib/db";
import { type User } from "firebase/auth";
import { doc, type DocumentData } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import type { Children, UID } from "./types";
import { type ProfileSchema } from "@src/server/resource/account";

export type SN = string | null;

export type AuthType = {
  user: User | null | undefined;
  profile: ProfileSchema | DocumentData | undefined;
  loading: boolean;
  configs: Record<string, string | number | boolean>[];
};

/**
 * @name AuthContext
 * @description Main context for the user authentication
 * @location app/context
 */
export const AuthContext = createContext<AuthType | null>(null);

/**
 * @name AuthProvider
 * @description Main provider for the user authentication
 * @location app/context
 */
export const AuthProvider = ({ children }: Children) => {
  const [user, loading] = useAuthState(auth);
  const [userId, setUserId] = useState<UID>(user?.uid);

  const docRef = doc(db, "users", `${userId}`);
  const [docValue] = useDocument(docRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [profile, setProfile] = useState<
    DocumentData | ProfileSchema | undefined
  >();

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
      if (docValue) {
        setProfile(docValue.data() as ProfileSchema);
      }
    }
  }, [user, userId, docValue]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, configs: [] }}>
      {children}
    </AuthContext.Provider>
  );
};
