import { createUserAccount } from "@@firebase/account";
import { CreateUser } from "@@procedure/account";
import { router } from "../trpc";

export const accountRouter = router({
  createUser: CreateUser.query(async ({ input }) => {
    return createUserAccount(input);
  }),
});
