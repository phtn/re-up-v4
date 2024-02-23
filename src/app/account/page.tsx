import { CheckAuth } from "./check-auth";
import { Content } from "./content";

const Account = () => {
  return (
    <div className="h-full">
      <CheckAuth />
      <Content />
    </div>
  );
};
export default Account;
