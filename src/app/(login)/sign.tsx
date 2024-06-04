import { Sheet, SheetContent, SheetTrigger } from "@@ui/sheet";
import { DarkTouch, Touch } from "@@ui/touch";
import { auth, db } from "@src/lib/db";
import { Err, Ok } from "@src/utils/results";
import { collection } from "firebase/firestore";
import { ArrowUpRightIcon, Disc3Icon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import {
  forwardRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import tw from "tailwind-styled-components";
import { useSignIn } from "./hooks";
import { Login } from "./sign-in";

// type SignProps = {
//   children: ReactNode;
// };
export const Sign = () => {
  const [creds] = useAuthState(auth);
  const [servicesLoading, setLoading] = useState(false);
  const servicesRoute = () => {
    setLoading(true);
  };
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [query] = useCollection(collection(db, "users"));
  const { signIn } = useSignIn();

  const onSignIn = () => {
    signIn({ signInWithGoogle, query }).then(Ok).catch(Err);
  };
  const withCreds = creds?.uid !== undefined;

  const props: HeroActionProps = {
    loading: servicesLoading,
    handleRoute: servicesRoute,
    signIn: onSignIn,
    withCreds,
  };

  // const childrenWithProps = Children.map<P,>(children, (child) => {
  //   if (isValidElement(child)) {
  //     if (child)
  //       return cloneElement<props: P>(child, props);
  //   }
  //   return child;
  // });

  return <HeroActions {...props} />;
};

type HeroActionProps = {
  loading: boolean;
  handleRoute: () => void;
  signIn: () => void;
  withCreds: boolean;
};
export const HeroActions = ({
  loading,
  handleRoute,
  signIn,
  withCreds,
}: HeroActionProps) => {
  return (
    <Container>
      <ViewAllServices
        loading={loading}
        onClick={handleRoute}
        withCreds={withCreds}
      />
      {!withCreds ? (
        <Touch onClick={signIn} className="px-2.5 tracking-tighter">
          <div className="flex items-center space-x-1">
            <div className="pr-1 text-gray-500">Sign in with Google</div>
            <div className="h-[20px] w-[20px] bg-[url('/svg/g_logo.svg')] bg-contain bg-no-repeat" />
          </div>
        </Touch>
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
          accountType="BUSINESS"
          description={`with your email & password.`}
          newAccount={false}
          setOpen={setOpen}
          title={"Sign in to your account"}
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
  withCreds: boolean;
};
const ViewAllServices = forwardRef<HTMLButtonElement, ViewAllServicesProps>(
  ({ loading, onClick, withCreds }, ref) => (
    <Link href={`/services`}>
      <DarkTouch
        ref={ref}
        tail={
          loading
            ? Disc3Icon
            : withCreds
              ? LayoutDashboardIcon
              : ArrowUpRightIcon
        }
        iconClass={loading ? "animate-spin stroke-1" : ""}
        className="w-full"
        onClick={onClick}
      >
        {withCreds ? "Dashboard" : "View Services"}
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
    Sign in with Google
  </Touch>
));

LightButton.displayName = "LightButton";

const Container = tw.div`
  flex items-center portrait:justify-center justify-start space-x-4 w-full
 `;
const Content = tw(SheetContent)`
  px-4 pb-12 md:absolute md:left-[calc(100vw-416px)] md:mb-4 md:w-[400px] md:p-6 portrait:w-full
 `;
