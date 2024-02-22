export const Pricing = () => (
  <div className="grid grid-cols-1 gap-x-[36px] md:grid-cols-3">
    <div className="h-[200px] space-y-4 bg-mojo px-[30px] py-[18px]">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-1">
          <p className="text-xl font-bold tracking-tight text-whb">Developer</p>
          <p className="text-xl font-medium tracking-tighter text-clay/60">
            Account
          </p>
        </div>
        <div className="flex w-fit items-center justify-center bg-coal px-6 py-1">
          <p className="text-sm font-medium tracking-wide text-cyan-50">Free</p>
        </div>
      </div>
    </div>
    <div className="h-[200px] bg-mojo px-[36px] py-[18px]">
      <div className="flex items-center space-x-2">
        <p className="text-xl font-bold tracking-tight text-sky-500">Team</p>
        <p className="text-lg font-light tracking-tight text-clay">Account</p>
      </div>
    </div>
    <div className="h-[200px] bg-mojo px-[36px] py-[18px]">
      <div className="flex items-center space-x-4">
        <p className="text-xl font-bold tracking-tight text-fgmod">
          Enterprise
        </p>
        <p className="text-lg font-light tracking-tight text-clay">Account</p>
      </div>
    </div>
  </div>
);
