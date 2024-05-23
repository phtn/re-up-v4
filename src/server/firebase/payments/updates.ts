import { db } from "@src/lib/db";
import { type UpdatePaymentInternalSchema } from "@src/server/resource/payments/updates";
import { Err, Ok } from "@src/utils/results";
import { doc, updateDoc } from "firebase/firestore";

export const updatePaymentInternal = async (
  params: UpdatePaymentInternalSchema,
) => {
  const { payload, document, docId, userId } = params;
  if (!userId) return Promise.reject(new Error("No user id provided"));

  const userRef = doc(db, `users/${userId}`);

  await updateDoc(userRef, {
    updatedAt: new Date().getTime(),
  });
  const docRef = doc(
    db,
    `users/${userId}/payments/${document}/copperx/${docId}`,
  );
  return await updateDoc(docRef, {
    ...payload,
    updatedAt: new Date().getTime(),
  })
    .then(Ok)
    .catch(Err);
};
