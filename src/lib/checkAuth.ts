import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./db";

export const checkAuth = async () => {
  onAuthStateChanged(auth, (observer) => {
    if (observer) {
      return true;
    }
    return false;
  });
  return false;
};

/**
 * Path: lib/checkAuth.ts
 *
 *
 */
