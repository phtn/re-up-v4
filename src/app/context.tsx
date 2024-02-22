"use client";

import { auth, db } from "@@lib/db";
import { type User } from "firebase/auth";
import { type DocumentData, doc } from "firebase/firestore";
import { createContext, useState, type ReactNode, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

export type UID = string | undefined;
export type SN = string | null;
type ProfileDocumentData = DocumentData | undefined;

export type AuthType = {
  user: User | null | undefined;
  profile: ProfileDocumentData;
  loading: boolean;
  configs: Record<string, string | number | boolean>[];
};

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const [userId, setUserId] = useState<UID>();
  const [profile, setProfile] = useState<ProfileDocumentData>();

  const userRef = doc(db, `users`, `${userId}`);
  const [snapshot] = useDocumentData(userRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (user?.uid) {
      setUserId(user.uid);
      if (snapshot) {
        setProfile(snapshot);
      }
    }
  }, [user?.uid, snapshot]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, configs: [] }}>
      {children}
    </AuthContext.Provider>
  );
};
