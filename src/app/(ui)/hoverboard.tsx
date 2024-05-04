"use client";

import { cn } from "@src/utils/cn";
import { motion } from "framer-motion";
import {
  useCallback,
  useRef,
  useState,
  type HTMLProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import tw from "tailwind-styled-components";

type HoverboardProps = {
  children: ReactNode;
  parentStyle: HTMLProps<HTMLElement>["className"];
  pillStyle?: HTMLProps<HTMLElement>["className"];
  snapPoints: number[];
  offset: number;
};

/**
 * https://re-up.ph
 * (ui) - Hoverboard
 * highlight links on hover like vercel
 * @default - vertical
 * @author phtn
 */
export const Hoverboard = ({
  children,
  parentStyle,
  snapPoints,
  offset,
}: HoverboardProps) => {
  const [y, setY] = useState(0);
  const vRef = useRef<HTMLDivElement>(null);

  const verticalMouseOver = useCallback(
    (e: MouseEvent) => {
      const vRect = vRef.current?.getBoundingClientRect();
      const height = vRect?.bottom ?? 0 - (vRect?.top ?? 0);
      const top = snapPoints[findIndex(snapPoints, height - e.clientY)]! * -1;
      setY(top + height - offset);
    },
    [vRef, snapPoints, offset],
  );

  return (
    <Container
      ref={vRef}
      onMouseOver={verticalMouseOver}
      className={parentStyle}
    >
      <Pill animate={{ y }} transition={{ type: "transform" }} />
      {children}
    </Container>
  );
};

/**
 * https://re-up.ph
 * (ui) - Hoverpill
 * highlight links on hover like vercel
 * @default - horizontal
 * @author phtn
 */
export const Hoverpill = ({
  children,
  parentStyle,
  snapPoints,
}: HoverboardProps) => {
  const [left, setLeft] = useState(0);
  const hRef = useRef<HTMLDivElement>(null);

  const horizontalMouseOver = useCallback(
    (e: MouseEvent) => {
      const hRect = hRef.current?.getBoundingClientRect();
      const x = hRect?.x;
      setLeft(findIndex(snapPoints, e.clientX - (x ?? 0)));
    },
    [snapPoints, hRef],
  );

  return (
    <Container
      ref={hRef}
      onMouseOver={horizontalMouseOver}
      className={parentStyle}
    >
      <Pill
        className={cn(`top-[23px]`, left === 2 ? `w-[120px]` : `w-full`)}
        animate={{
          x:
            left === 1
              ? 0
              : left === 2
                ? left * 63
                : left === 3
                  ? left * 89
                  : left * 67,
        }}
        transition={{ type: "transform" }}
      />
      {children}
    </Container>
  );
};

/**
 * https://re-up.ph
 * (ui) - Hoverdrop
 * highlight dropdown menu on hover like vercel
 * @default - vertical
 * @author phtn
 */
export const Hoverdrop = ({
  children,
  parentStyle,
  pillStyle,
  snapPoints,
  offset,
}: HoverboardProps) => {
  const [y, setY] = useState(0);
  const vRef = useRef<HTMLDivElement>(null);

  const verticalMouseOver = useCallback(
    (e: MouseEvent) => {
      const vRect = vRef.current?.getBoundingClientRect();
      const height = vRect?.bottom ?? 0 - (vRect?.top ?? 0);
      const top = snapPoints[findIndex(snapPoints, e.clientY) ?? 0]!;
      setY(top - height / 2 + offset);
    },
    [snapPoints, offset],
  );

  return (
    <Container
      ref={vRef}
      onMouseOver={verticalMouseOver}
      className={parentStyle}
    >
      <Pill
        className={pillStyle}
        animate={{ y }}
        transition={{ type: "transform" }}
      />
      {children}
    </Container>
  );
};

function findIndex(arr: number[], n: number) {
  let prev = 0;
  const idx = arr.findIndex((e, i) => e > n && (i === 0 || arr[i - 1]! <= n));
  if (idx === -1) return prev;
  prev = idx;
  return idx;
}

const Container = tw.div`
  group
  `;

const Pill = tw(motion.div)`
  relative lg:h-[46px] rounded-md
  lg:group-hover:bg-ash/30
  transition-colors duration-300 delay-200 ease-in
  pointer-events-none z-40
  `;
