import { CheckAuth } from "./check-auth";
import { Content } from "./content";

const Account = () => {
  return (
    <div className="h-full">
      <Content />
      <CheckAuth />
    </div>
  );
};
export default Account;
