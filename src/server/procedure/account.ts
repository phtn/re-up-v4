import {
  CreateAccountResource,
  UpdateUserDataResource,
} from "@@resource/account";
import { procedure } from "../trpc";

export const CreateUser = procedure.input(CreateAccountResource);

export const UpdateUserDataProcedure = procedure.input(UpdateUserDataResource);
