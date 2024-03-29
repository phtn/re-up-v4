import { db } from "@src/lib/db";
import { Err, Ok } from "@src/utils/results";
import {
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { type AddWebhookSchema } from "../resource/webhook";

export const addWebhookDocument = async (params: AddWebhookSchema) => {
  const { userId, payload } = params;
  if (!userId) return Promise.reject(new Error("No user id provided"));

  const userRef = doc(db, `users/${userId}`);
  await updateDoc(userRef, {
    webhookCount: increment(1),
  }).catch(Err);

  const docRef = collection(db, `users/${userId}/webhooks`);
  return await setDoc(doc(docRef, payload.webhook.id ?? ""), {
    ...payload,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  })
    .then(Ok)
    .catch(Err);
};
