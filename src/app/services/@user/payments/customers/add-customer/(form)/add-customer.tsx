import { useAuthState } from "react-firebase-hooks/auth";
import { AddCustomerForm } from "./customer-form";
import { auth } from "@src/lib/db";
import { usePathname } from "next/navigation";

export const AddCustomer = () => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const pathname = usePathname();
  const route = pathname.split("/")[3];

  return <AddCustomerForm userId={`${userId}`} route={`${route}`} />;
};
