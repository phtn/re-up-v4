"use client";

import { auth, db } from "@@lib/db";
import { type User } from "firebase/auth";
import { doc, type DocumentData } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import type { Children, UID } from "./types";

// jsdoc
/**
 * @typedef {string | null} SN
 */
export type SN = string | null;

/**
 * @typedef {DocumentData | undefined} ProfileDocumentData
 */
type ProfileDocumentData = DocumentData | undefined;

/**
 * @typedef {Object} AuthType
 * @property {User | null | undefined} user
 * @property {ProfileDocumentData} profile
 * @property {boolean} loading
 * @property {Record<string, string | number | boolean>[]} configs
 */

/**
 * @type {React.Context<AuthType | null>}
 */
export type AuthType = {
  user: User | null | undefined;
  profile: ProfileDocumentData;
  loading: boolean;
  configs: Record<string, string | number | boolean>[];
};

/**
 * @name AuthContext
 * @type {React.Context<AuthType | null>}
 * @description Main context for the user authentication
 * @location app/context
 */
export const AuthContext = createContext<AuthType | null>(null);

/**
 * @name AuthProvider
 * @type {React.FC<Children>}
 * @param {Children} children
 * @description Main provider for the user authentication
 * @location app/context
 */
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
