import { Sheet, SheetContent, SheetTrigger } from "@@ui/sheet";
import { DarkTouch, Touch } from "@@ui/touch";
import { ArrowRightIcon } from "lucide-react";
import {
  forwardRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import tw from "tailwind-styled-components";
import { Login } from "./sign-in";

export const Sign = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <Container>
      <div className="flex w-full flex-1">
        <DarkButton />
      </div>
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
      <Content side={"bottom"}>
        <Login
          title={"Sign in to your account"}
          description={`with your email & password.`}
          newAccount={false}
          accountType="BUSINESS"
          setOpen={setOpen}
        />
      </Content>
    </Sheet>
  );
};

export const SignUpSheet = ({ open, setOpen, children }: SignSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <Content side={"bottom"}>
        <Login
          title={"Create new account"}
          description={`with your email & password.`}
          setOpen={setOpen}
          newAccount={true}
          accountType="BUSINESS"
        />
      </Content>
    </Sheet>
  );
};

const DarkButton = forwardRef<HTMLButtonElement>((props, ref) => (
  <DarkTouch
    ref={ref}
    size="md"
    tail={ArrowRightIcon}
    className="w-full text-sm portrait:w-[150px]"
    {...props}
  >
    View All Services
  </DarkTouch>
));

DarkButton.displayName = "DarkButton";

const LightButton = forwardRef<HTMLButtonElement>((props, ref) => (
  <Touch
    ref={ref}
    className="w-[120px] portrait:w-[150px]"
    size="md"
    {...props}
  >
    Sign up
  </Touch>
));

LightButton.displayName = "LightButton";

const Container = tw.div`
  flex items-center justify-between space-x-4 w-full
 `;
const Content = tw(SheetContent)`
  px-4 pb-12 md:absolute md:left-[calc(100vw-416px)] md:mb-4 md:w-[400px] md:p-6 portrait:w-full
 `;
