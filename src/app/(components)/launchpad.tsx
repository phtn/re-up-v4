import tw from "tailwind-styled-components";
import { type Children } from "../(main)/types";

export const LaunchPad = ({ children }: Children) => {
  return (
    <Base>
      <StageZero>{children}</StageZero>
    </Base>
  );
};

export const Pad = ({ children }: Children) => {
  return (
    <Cape>
      <StageZero>{children}</StageZero>
    </Cape>
  );
};

export const Base = tw.div`
    w-full h-fit md:h-[714px]
    bg-void/80 overflow-scroll
    border-[0.33px] border-ash/60 rounded-[4px]
    portrait:border-0 portrait:rounded-none
    shadow-xl shadow-stone-400
    `;
export const Cape = tw.div`
    w-full h-fit md:h-[400px]
    bg-void/80 overflow-scroll
    border-[0.33px] border-ash/60 rounded-[4px]
    shadow-lg shadow-stone-400
    `;
export const ClearBase = tw.div`
    w-full h-fit md:h-[714px]
    overflow-scroll
    `;
export const StageZero = tw.div`
    bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
    from-indigo-300/50 via-slate-300 to-orange-50 h-full w-full
    `;
export const GroundZero = tw.div`
    h-full md:h-screen pt-[72px] md:px-[72px]
    bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
    from-cyan-100 via-orange-100
  `;
