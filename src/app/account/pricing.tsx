import { UserCircle } from "lucide-react";

export const Pricing = () => {
  return (
    <div className="grid h-fit grid-cols-1 overflow-clip border-b md:h-[200px] md:grid-cols-3 ">
      <div className="flex h-[200px] flex-col justify-center space-y-4 bg-mojo/50">
        <div className="flex h-full flex-col space-y-4 border-whb bg-mojo p-[16px]">
          <div className="flex items-center space-x-2 drop-shadow-sm">
            <UserCircle className="h-5 w-5 text-sky-500" strokeWidth={1.5} />
            <p className="text-lg font-bold tracking-tighter text-clay">
              Individual
            </p>
            <p></p>
          </div>

          <div className="w-fit"></div>
        </div>
      </div>
      <div className="h-[200px] bg-darkmojo p-[16px] drop-shadow">
        <div className="flex items-center space-x-2 drop-shadow-sm">
          <UserCircle className="h-5 w-5 text-sky-500" strokeWidth={1.5} />
          <p className="text-lg font-bold tracking-tighter text-coal">Team</p>
          <p></p>
        </div>
      </div>
      <div className="h-[200px] bg-rome p-[16px]">
        <div className="flex items-center space-x-2 drop-shadow-sm">
          <UserCircle className="h-5 w-5 text-sky-500" strokeWidth={1.5} />
          <p className="text-lg font-bold tracking-tighter text-void">
            Enterprise
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
