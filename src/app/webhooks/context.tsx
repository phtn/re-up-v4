"use client";

import { auth, db } from "@src/lib/db";
import { type DocumentData, collection, doc } from "firebase/firestore";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import type { Children } from "../types";

export interface WebhookContextValue {
  webhooks: DocumentData[] | undefined;
}

export const WebhookContext = createContext<
  WebhookContextValue | null | undefined
>(null);

export const WebhookProvider = ({ children }: Children) => {
  const [user] = useAuthState(auth);

  const webhooksRef = collection(doc(db, "users", `${user?.uid}`), "webhooks");
  const [webhooks] = useCollectionData(webhooksRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <WebhookContext.Provider value={{ webhooks }}>
      {children}
    </WebhookContext.Provider>
  );
};

// const dataConverter: FirestoreDataConverter<WebhookDataSchema> = {
//   toFirestore(webhooks): DocumentData {
//     return {
//       webhook: webhooks.webhook,
//       portal: webhooks.portal,
//       createdAt: webhooks.createdAt,
//       updatedAt: webhooks.updatedAt, //     };
//   },
//   fromFirestore(snapshot, options): WebhookPayloadSchema {
//     const data = snapshot.data(options) as DocumentData;
//     return {
//       webhook: data.webhook,
//       portal: data.portal,
//     };
//   },
// };
