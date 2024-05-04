import { useAuthState } from "react-firebase-hooks/auth";
import { AddCustomerForm } from "./customer-form";
import { auth } from "@src/lib/db";

export const AddCustomer = () => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  return <AddCustomerForm userId={`${userId}`} />;
};
