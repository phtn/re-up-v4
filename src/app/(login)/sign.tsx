import { Sheet, SheetContent, SheetTrigger } from "@@ui/sheet";
import { DarkTouch, Touch } from "@@ui/touch";
import { ArrowRightIcon, Disc3Icon } from "lucide-react";
import {
  forwardRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import tw from "tailwind-styled-components";
import { Login } from "./sign-in";
import Link from "next/link";
import { auth } from "@src/lib/db";
import { useAuthState } from "react-firebase-hooks/auth";

export const Sign = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const handleServicesRoute = () => {
    setLoading(true);
  };
  return (
    <Container>
      <ViewAllServices loading={loading} onClick={handleServicesRoute} />
      {!user ? (
        <SignUpSheet open={signupOpen} setOpen={setSignupOpen}>
          <LightButton />
        </SignUpSheet>
      ) : null}
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

type ViewAllServicesProps = {
  loading: boolean;
  onClick: () => void;
};
const ViewAllServices = forwardRef<HTMLButtonElement, ViewAllServicesProps>(
  ({ loading, onClick }, ref) => (
    <Link href={`/services`}>
      <DarkTouch
        ref={ref}
        size="md"
        tail={loading ? Disc3Icon : ArrowRightIcon}
        iconClass={loading ? "animate-spin stroke-1" : ""}
        className="w-full text-sm"
        onClick={onClick}
      >
        Dashboard
      </DarkTouch>
    </Link>
  ),
);

ViewAllServices.displayName = "ViewAllServices";

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
  flex items-center portrait:justify-center justify-between space-x-4 w-full
 `;
const Content = tw(SheetContent)`
  px-4 pb-12 md:absolute md:left-[calc(100vw-416px)] md:mb-4 md:w-[400px] md:p-6 portrait:w-full
 `;
