import { type ReactNode } from "react";

export function XGrid({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-950 bg-dot-[#3b82f6]/[0.5] dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {children}
    </div>
  );
}
