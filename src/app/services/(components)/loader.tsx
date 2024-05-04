import { LoaderIcon } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-void">
      <div className="flex items-center justify-center space-x-4">
        <p className="animate-pulse text-lg text-cyan-700">Updating</p>
        <LoaderIcon
          size={24}
          strokeWidth={1}
          className="animate-spin text-cyan-600"
        />
      </div>
      <div className="mt-6 h-[1px] w-[500px] animate-shimmer bg-kindle bg-[linear-gradient(110deg,#000103,45%,#93c5fd,55%,#000103)] bg-[length:200%_100%] transition-all duration-500"></div>
    </div>
  );
};
