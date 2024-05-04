import { db } from "@src/lib/db";
import { type AddCustomerInternalSchema } from "@src/server/resource/payments/customer";
import { Err, Ok } from "@src/utils/results";
import {
  arrayUnion,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const addCustomerInternal = async (
  params: AddCustomerInternalSchema,
) => {
  const { customerReferenceId, responseData, id, userId } = params;
  if (!userId) return Promise.reject(new Error("No user id provided"));

  const list = arrayUnion({ customerReferenceId, id });
  const userRef = doc(db, `users/${userId}`);
  await updateDoc(userRef, {
    payments: {
      customers: {
        count: increment(1),
      },
      list,
    },
  }).catch(Err);

  const docRef = collection(db, `users/${userId}/payments/customers`);
  return await setDoc(doc(docRef, id), {
    ...responseData,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  })
    .then(Ok)
    .catch(Err);
};
