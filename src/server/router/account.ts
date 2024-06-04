import { createUserAccount, updateUserData } from "@@firebase/account";
import { CreateUser, UpdateUserDataProcedure } from "@@procedure/account";
import { router } from "../trpc";

export const accountRouter = router({
  createUser: CreateUser.query(
    async ({ input }) => await createUserAccount(input),
  ),
  updateUser: UpdateUserDataProcedure.query(
    async ({ input }) => await updateUserData(input),
  ),
});
