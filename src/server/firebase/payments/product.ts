import { db } from "@src/lib/db";
import { type AddProductInternalSchema } from "@src/server/resource/payments/product";
import { Err, Ok } from "@src/utils/results";
import {
  arrayUnion,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const addProductInternal = async (params: AddProductInternalSchema) => {
  const { responseData, id, userId } = params;
  if (!userId) return Promise.reject(new Error("No user id provided"));

  const list = arrayUnion({ name: responseData.name, id });
  const userRef = doc(db, `users/${userId}`);

  await updateDoc(userRef, {
    updatedAt: new Date().getTime(),
    copperxProductCount: increment(1),
    copperxProductList: list,
  });
  const docRef = collection(db, `users/${userId}/payments/products/copperx`);
  return await setDoc(doc(docRef, id), {
    ...responseData,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  })
    .then(Ok)
    .catch(Err);
};
