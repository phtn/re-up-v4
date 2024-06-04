import { type NewUserPayload } from "@src/server/resource/account";
import { createUser } from "@src/trpc/account/create";
import { updateUser } from "@src/trpc/account/update";
import { icashCreateVA } from "@src/trpc/icash/merchant";
import { onError, onSuccess } from "@src/utils/toast";
import type { UserCredential } from "firebase/auth";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const icash_auth = {
  merchantCode: `${process.env.NEXT_PUBLIC_ICASH_CODE}`,
  merchantUsername: `${process.env.NEXT_PUBLIC_ICASH_USER}`,
  merchantPassword: `${process.env.NEXT_PUBLIC_ICASH_PASS}`,
};

type CreateVirtualAcctParams = {
  uid: string | undefined;
  displayName: string | null | undefined;
};
export const useSignup = () => {
  const createVirtualAcct = async ({
    uid,
    displayName,
  }: CreateVirtualAcctParams) =>
    await icashCreateVA({
      ...icash_auth,
      merchantCustomerId: uid!,
      firstName: displayName ?? "first",
      lastName: displayName ?? "last",
    });

  return { createVirtualAcct };
};

// type SignInWithGoogleParams =
//   | {
//       scopes?: string[] | undefined;
//       customOAuthParameters?: CustomParameters | undefined;
//     }
//   | undefined;
type SignInWithGoogle = Promise<UserCredential | undefined>;

interface SignInHandler {
  signInWithGoogle: () => SignInWithGoogle;
  query: QuerySnapshot<DocumentData, DocumentData> | undefined;
}

export const useSignIn = () => {
  const router = useRouter();

  const createVirtualAcct = async ({
    uid,
    displayName,
  }: CreateVirtualAcctParams) =>
    await icashCreateVA({
      ...icash_auth,
      merchantCustomerId: uid!,
      firstName: displayName ?? "first",
      lastName: displayName ?? "last",
    });

  const signIn = async (params: SignInHandler) => {
    const { signInWithGoogle, query } = params;
    const creds = await signInWithGoogle();
    const userCred = creds?.user;

    const user: NewUserPayload = {
      userId: userCred?.uid,
      email: userCred?.email,
      accountType: "PERSONAL",
    };

    const userExist = query?.docs.find((doc) => doc.id === userCred?.uid);

    if (!userExist) {
      await createUser(user);
      const icash = await createVirtualAcct({
        uid: user.userId,
        displayName: userCred?.displayName,
      });
      const update = await updateUser({
        payload: { icash },
        userId: user.userId,
      });
      if (update) {
        onSuccess("Account created.", "success");
        router.push("/services");
      } else {
        onError("Unable to sign in to Google");
      }
    }
  };

  return { signIn };
};
