import { Disc3Icon } from "lucide-react";

const Webhooks = async () => {
  console.log("webhooks default");
  return (
    <div className=" justify center bg-mojo flex h-[700px] w-full items-center space-x-4">
      <p className="text-darkmojo text-xs">Webhooks</p>
      <Disc3Icon size={24} className="text-dark-mojo animate-spin" />
    </div>
  );
};

export default Webhooks;
