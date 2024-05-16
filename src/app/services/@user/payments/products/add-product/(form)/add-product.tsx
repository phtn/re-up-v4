import { useAuthState } from "react-firebase-hooks/auth";
import { AddProductForm } from "./product-form";
import { auth } from "@src/lib/db";
import { usePathname } from "next/navigation";

export const AddProduct = () => {
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  const pathname = usePathname();
  const route = pathname.split("/")[3];

  return <AddProductForm userId={`${userId}`} route={`${route}`} />;
};
