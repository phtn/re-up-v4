import { db } from "@src/lib/db";
import { type AddInvoiceInternalSchema } from "@src/server/resource/payments/invoice";
import { Err, Ok } from "@src/utils/results";
import {
  arrayUnion,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const addInvoiceInternal = async (params: AddInvoiceInternalSchema) => {
  const { responseData, id, userId } = params;
  if (!userId) return Promise.reject(new Error("No user id provided"));

  const list = arrayUnion({ name: responseData?.invoiceNumber, id });
  const userRef = doc(db, `users/${userId}`);

  await updateDoc(userRef, {
    updatedAt: new Date().getTime(),
    copperxInvoiceCount: increment(1),
    copperxInvoiceList: list,
  });
  const docRef = collection(db, `users/${userId}/payments/invoices/copperx`);
  return await setDoc(doc(docRef, id), {
    ...responseData,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  })
    .then(Ok)
    .catch(Err);
};
