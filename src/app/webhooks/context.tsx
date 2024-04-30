"use client";
import { auth, db } from "@src/lib/db";
import { type WebhookDataSchema } from "@src/server/resource/webhook";
import {
  type FirestoreDataConverter,
  collection,
  doc,
  type DocumentData,
} from "firebase/firestore";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { type Children } from "../(main)/types";

export interface WebhookContextValue {
  webhooks: WebhookDataSchema[] | undefined;
}

export const WebhookContext = createContext<
  WebhookContextValue | null | undefined
>(null);

export const WebhookProvider = ({ children }: Children) => {
  const [user] = useAuthState(auth);

  const webhooksRef = collection(
    doc(db, "users", `${user?.uid}`),
    "webhooks",
  ).withConverter(dataConverter);
  const [webhooks] = useCollectionData(webhooksRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <WebhookContext.Provider value={{ webhooks }}>
      {children}
    </WebhookContext.Provider>
  );
};

const dataConverter: FirestoreDataConverter<WebhookDataSchema> = {
  toFirestore(): DocumentData {
    return {};
  },
  fromFirestore(snapshot, options): WebhookDataSchema {
    const data = snapshot.data(options) as WebhookDataSchema;
    return {
      webhook: data.webhook,
      portal: data.portal,
      endpoints: data.endpoints,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      id: snapshot.id,
    };
  },
};
