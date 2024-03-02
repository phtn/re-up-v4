import { auth } from "./db";

/**
 * @name checkAuth
 * @description A hook that returns auth state
 * @location lib/checkAuth.ts
 */
export const checkAuth = () => {
  const currentUser = () => auth.currentUser;
  if (!!currentUser) {
    return true;
  }
  return false;
};
