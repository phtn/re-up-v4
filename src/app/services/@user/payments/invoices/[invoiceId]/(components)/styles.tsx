import tw from "tailwind-styled-components";

export const Title = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-4 py-2">
    <p className="text-sm font-medium tracking-tighter text-dyan/80">{text}</p>
  </div>
);
export const Container = tw.div`
  h-[564px] w-full space-y-12 portrait:space-y-6 portrait:px-2 overflow-y-scroll pt-12 portrait:pt-6
  `;
export const Subtext = tw.p`
  font-mono text-xs text-dyan/80 tracking-tight
  `;
export const Widget = tw.div`
   h-full w-full flex flex-col items-center justify-center
   rounded bg-paper/20 px-4 border-[0.33px] border-dyan/30 py-4
  `;
