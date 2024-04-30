import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../(main)/context";
import { type ProfileSchema } from "@src/server/resource/account";

/**
 * @name useAccountInfo
 * @description A hook that returns the user and profile
 * @location account/hooks.ts
 */
export const useAccountInfo = () => {
  const [loading, setLoading] = useState(false);
  const creds = useContext(AuthContext);
  const user = creds?.user;
  const profile = creds?.profile as ProfileSchema;

  useEffect(() => {
    if (!user || !profile) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user, profile]);

  return { user, profile, loading };
};
