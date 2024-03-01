"use client";

import { auth, db } from "@@lib/db";
import { type User } from "firebase/auth";
import { doc, type DocumentData } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import type { Children, UID } from "./types";

export type SN = string | null;
type ProfileDocumentData = DocumentData | undefined;

export type AuthType = {
  user: User | null | undefined;
  profile: ProfileDocumentData;
  loading: boolean;
  configs: Record<string, string | number | boolean>[];
};

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: Children) => {
  const [user, loading] = useAuthState(auth);
  const [userId, setUserId] = useState<UID>(user?.uid);

  const docRef = doc(db, "users", `${userId}`);
  const [snapshot] = useDocument(docRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [profile, setProfile] = useState<ProfileDocumentData>(snapshot?.data());

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
      if (snapshot) {
        setProfile(snapshot.data());
      }
    }
  }, [user, userId, snapshot]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, configs: [] }}>
      {children}
    </AuthContext.Provider>
  );
};
