import tw from "tailwind-styled-components";

export const Title = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-4 py-2">
    <p className="font-medium tracking-tighter text-dyan/80 portrait:text-sm">
      {text}
    </p>
  </div>
);
export const Container = tw.div`
  h-[calc(100vh-144px)] w-full space-y-12 portrait:space-y-6 portrait:px-2 overflow-y-scroll pt-12 portrait:pt-6
  `;
export const Subtext = tw.p`
  font-mono text-xs text-dyan/80 tracking-tight
  `;
export const Widget = tw.div`
   h-full w-full flex flex-col items-center justify-center
   rounded-md bg-ghost px-4 border-[0.33px] border-dyan/20 py-4

  `;
