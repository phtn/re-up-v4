import { type ReactNode } from "react";

export function XGrid({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded bg-zinc-950 bg-dot-[#0369a1]/[0.5] dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-black"></div>
      {children}
    </div>
  );
}

export function QGrid({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-zinc-950 bg-dot-[#0369a1]/[0.5] dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-black"></div>
      {children}
    </div>
  );
}

export function FGrid({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-zinc-950 bg-dot-[#0369a1]/[0.25] dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-black"></div>
      {children}
    </div>
  );
}

export function AuGrid({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full bg-rome/40 bg-dot-fast/[0.33]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-void/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
      {children}
    </div>
  );
}
