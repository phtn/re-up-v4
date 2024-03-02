import { useContext } from "react";
import { AuthContext } from "../context";

/**
 * @name useCredentials
 * @description A hook that returns isAuthed
 * @returns {Object} { isAuthed: boolean }
 * @location account/hooks.ts
 */
export const useCredentials = () => {
  const creds = useContext(AuthContext);
  const isAuthed = creds?.user ? true : false;

  return isAuthed;
};

/**
 * @name useAccountInfo
 * @description A hook that returns the user and profile
 * @returns {Object} { user, profile }
 * @location account/hooks.ts
 */
export const useAccountInfo = () => {
  const creds = useContext(AuthContext);
  const user = creds?.user;
  const profile = creds?.profile;

  return { user, profile };
};
