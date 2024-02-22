import { db } from "@@lib/db";
import { type NewUserPayload } from "@@resource/account";
import { type FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

export const createUserAccount = async (user: NewUserPayload) => {
  const Err = (err: FirebaseError) => {
    return [0, err.code];
  };
  const Ok = () => {
    return [1, "success"];
  };

  if (user) {
    const { email, userId, accountType } = user;
    await setDoc(doc(db, "users", userId), {
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
      address: {
        lineOne: null,
        lineTwo: null,
        city: null,
        state: null,
        country: null,
      },
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }).then(Ok, Err);
  } else {
    return "Unable to read payload.";
  }
};
