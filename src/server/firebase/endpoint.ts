import { db } from "@src/lib/db";
import { Err, Ok } from "@src/utils/results";
import {
  arrayUnion,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { type AddEndpointParamsSchema } from "../resource/endpoint";

/**
 * @name addEndpoint
 * @description add endpoint document
 */
export const addEndpoint = async (params: AddEndpointParamsSchema) => {
  const { app_id, userId, name, payload } = params;
  if (!userId) return Promise.reject(new Error("No user id provided"));

  /**
   * @update user level endpoint count
   */
  const userRef = doc(db, `users/${userId}`);
  await updateDoc(userRef, {
    endpointCount: increment(1),
    updatedAt: new Date().getTime(),
  }).catch(Err);

  /**
   * @update webhooks level endpoints array with uid
   */
  const webhookRef = doc(db, `users/${userId}/webhooks/${app_id}`);
  const { uid, url, createdAt } = payload;
  const endpoints = arrayUnion({ uid, url, createdAt, name });
  await updateDoc(webhookRef, {
    endpoints,
    updatedAt: new Date().getTime(),
  });

  /**
   * @add endpoint document
   */
  const endpointsRef = collection(
    db,
    `users/${userId}/webhooks/${app_id}/endpoints`,
  );

  return await setDoc(doc(endpointsRef, uid), {
    ...payload,
    name,
    dbTimestamp: {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
  })
    .then(Ok)
    .catch(Err);
};
