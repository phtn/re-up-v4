import { db } from "@@lib/db";
import type { UpdateUserDataSchema, NewUserPayload } from "@@resource/account";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Err, Ok } from "@src/utils/results";

export const createUserAccount = async (user: NewUserPayload) => {
  if (user) {
    const { email, userId, accountType } = user;
    await setDoc(doc(db, `users/${userId}`), {
      userId,
      email,
      accountType,
      displayName: null,
      firstName: null,
      lastName: null,
      completeName: null,
      credentials: [],
      isVerified: false,
      isComplete: false,
      premium: false,
      webhookCount: 0,
      address: {
        street: null,
        city: null,
        state: null,
        country: null,
        zip: null,
      },
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }).then(Ok, Err);
  } else {
    return "Unable to read payload.";
  }
};

export const updateUserData = async (params: UpdateUserDataSchema) => {
  const { payload, userId } = params;
  if (!userId) return Promise.reject(new Error("No user id provided"));

  const userRef = doc(db, `users/${userId}`);

  await updateDoc(userRef, {
    ...payload,
    updatedAt: new Date().getTime(),
  })
    .then(Ok)
    .catch(Err);
};
