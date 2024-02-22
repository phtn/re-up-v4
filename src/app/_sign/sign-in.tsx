import { Form } from "@@components/form";
import { auth } from "@@lib/db";
import { type AccountType } from "@@server/resource/account";
import { onError, onSuccess } from "@@utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@src/trpc/account/create";
import { type FirebaseError } from "firebase/app";
import {
  ArrowRightIcon,
  CircleSlashIcon,
  DotIcon,
  GripHorizontalIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { QGrid } from "../_components/grid";
import { DarkTouch } from "../_components/touch";
import { loginDefaults, loginSchema, type LoginSchema } from "./schema";
import { ActiveForm } from "./sign-form";

export type UserType = z.infer<typeof AccountType>;

type LoginProps = {
  title: string;
  description: string;
  newAccount: boolean;
  accountType: UserType;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Login = ({
  title,
  description,
  newAccount,
  accountType,
  setOpen,
}: LoginProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaults,
  });

  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, creds, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const Err = (err: Error) => onError(err.name, err.message);

  useEffect(() => {
    if (creds) {
      console.log("All systems good.", new Date());
    }
    loginErrorHandler(error);
  }, [error, creds]);

  const handleCreateUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(email, password)
      .then((creds) => {
        if (creds) {
          createUser({
            userId: creds.user.uid,
            email: creds.user.email!,
            accountType,
          })
            .then(() => {
              onSuccess("Account created.", `with email ${creds?.user.email}`);
              setOpen(false);
              router.push("/account");
            })
            .catch(Err);
        }
      })
      .catch(Err);
  };

  const handleSignin = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password)
      .then((creds) => {
        if (creds) {
          onSuccess("Login succcessful.");
          setOpen(false);
          router.push("/account");
        }
      })
      .catch(Err);
  };

  const onSubmit = (values: LoginSchema) => {
    const { email, password } = values;
    if (newAccount) {
      handleCreateUser(email, password);
    } else {
      console.log("Signing in...");
      handleSignin(email, password);
    }
  };

  const handleSubmit = () => onSubmit(form.getValues());

  return (
    <Form {...form}>
      <div className=" rounded-2xl bg-gradient-to-b from-[#8FA0A8] to-[#C8BEB5]">
        <div className="rounded-2xl bg-gradient-to-b from-[#C8BEB5] to-[#30393d]">
          <div className="flex h-full w-full flex-col rounded-2xl bg-gradient-to-b from-[#30393d]/[50%] to-[#070809]/[50%] p-[4px]">
            <QGrid>
              <div className=" flex w-full flex-col rounded-[12px] border-[2px] border-[#1A1F33]/80 px-4 py-6 shadow-i-br-si">
                <div className="relative z-50">
                  <h2 className="bg-gradient-to-r from-orange-200/70 via-rose-100/60 via-[30%] to-sky-800 to-[90%] bg-clip-text text-xl font-semibold tracking-tighter text-transparent">
                    {title}
                  </h2>
                  <p className=" bg-gradient-to-r from-sky-200/70 to-cyan-100/40 bg-clip-text font-mono text-xs text-transparent">
                    {description}
                  </p>
                </div>
                <div className="relative z-50 flex h-[200px] w-full flex-col justify-center">
                  <ActiveForm
                    form={form}
                    loading={loading}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </QGrid>

            <div className="flex h-[90px] items-end justify-between px-4 pt-4 md:h-[84px]">
              <div className="flex h-full items-start space-x-6">
                <GripHorizontalIcon />
                <div className="flex h-full items-start space-x-2">
                  <DotIcon className="h-6 w-6 animate-pulse text-orange-600 blur-[3px]" />
                  <DotIcon className="h-6 w-6 text-orange-100 blur-[2px]" />
                </div>
              </div>
              <div className="flex rounded-[12.25px] border-[4px] border-[#30393d]/30 bg-void p-[1px]">
                <DarkTouch
                  size="lg"
                  tail={ArrowRightIcon}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </DarkTouch>
              </div>
            </div>
            <div className="flex h-[20px] items-center justify-between px-[6px]">
              <CircleSlashIcon
                className="h-3 w-3 opacity-80 drop-shadow"
                fill="rgba(65,65,65,0.3)"
              />
              <CircleSlashIcon
                className="h-3 w-3 rotate-[45deg] opacity-80 drop-shadow"
                fill="rgba(65,65,65,0.3)"
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

const loginErrorHandler = (error: FirebaseError | undefined) => {
  if (error) {
    if (error.code.includes("invalid-credential")) {
      return onError("Unable to login.", "Invalid Credentials");
    }
    onError("error", error.code);
  }
};
