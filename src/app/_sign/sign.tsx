import { Sheet, SheetContent, SheetTrigger } from "@@components/sheet";
import { ArrowUpRightIcon, LogInIcon } from "lucide-react";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";
import tw from "tailwind-styled-components";
import { DarkTouch, Touch } from "../_components/touch";
import { Login } from "./sign-in";

export const Sign = () => {
  const [signinOpen, setSigninOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <Container>
      <SignInSheet open={signinOpen} setOpen={setSigninOpen}>
        <DarkButton />
      </SignInSheet>
      <SignUpSheet open={signupOpen} setOpen={setSignupOpen}>
        <LightButton />
      </SignUpSheet>
    </Container>
  );
};

type SignSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export const SignInSheet = ({ open, setOpen, children }: SignSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="px-2 pb-12 md:absolute md:left-[calc(100vw-416px)] md:w-[400px] md:rounded-xl md:p-4 portrait:w-full"
      >
        <Login
          title={"Sign in to your account"}
          description={`with your email & password.`}
          newAccount={false}
          accountType="BUSINESS"
          setOpen={setOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export const SignUpSheet = ({ open, setOpen, children }: SignSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="px-2 pb-12 md:absolute md:left-[calc(100vw-416px)] md:w-[400px] md:rounded-xl md:p-4 portrait:w-full"
      >
        <Login
          title={"Create new account"}
          description={`with your email & password.`}
          setOpen={setOpen}
          newAccount={true}
          accountType="BUSINESS"
        />
      </SheetContent>
    </Sheet>
  );
};

const DarkButton = () => (
  <DarkTouch
    size="md"
    tail={LogInIcon}
    className="w-[175px] portrait:w-[150px]"
  >
    Sign in
  </DarkTouch>
);

const LightButton = () => (
  <Touch
    className="w-[175px] portrait:w-[150px]"
    size="md"
    variant="default"
    tail={ArrowUpRightIcon}
  >
    Sign up
  </Touch>
);

const Container = tw.div`
  flex items-center justify-center space-x-4 md:space-x-8
 `;
