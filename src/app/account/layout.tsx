import { Navbar } from "./navbar";
import { type Children } from "../types";

const AccountLayout = ({ children }: Children) => {
  return (
    <div className="bg-zap h-full md:h-screen">
      <Navbar />
      {children}
    </div>
  );
};
export default AccountLayout;
