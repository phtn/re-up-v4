"use client";
import { cn } from "@@utils/cn";
import React, {
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { createNoise3D } from "simplex-noise";

type KeyString =
  | string
  | string[]
  | undefined
  | number
  | Element
  | ReactNode
  | ReactElement;

export const Strings = ({
  children,
  className,
  containerClassName,
  colors,
  backgroundFill,
  blur = 2,
  speed = "slow",
  waveOpacity = 0.1,
  ...props
}: {
  children?: ReactElement<KeyString, string>;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: KeyString;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.0001;
      case "fast":
        return 0.002;
      default:
        return 0.01;
    }
  };

  const waveColors = colors ?? ["#fb923c", "#000000", "#bae6fd"];

  const init = () => {
    canvas = canvasRef.current!;
    ctx = canvas.getContext("2d")!;
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = i === 0 ? 1 : 6;
      ctx.strokeStyle = waveColors[i % waveColors.length]!;
      for (x = 0; x < w; x += i === 0 ? 2 : 5) {
        const y = noise(x / 2000, 0.2 * i, nt) * 75;
        ctx.lineTo(x, y + h * 0.65); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    ctx.fillStyle = backgroundFill ?? "black";
    ctx.globalAlpha = waveOpacity ?? 0.05;
    ctx.fillRect(0, 0, w, h);
    drawWave(3);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  });

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0 h-full w-screen"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      <div
        className={cn(
          "relative z-10 flex w-full items-center justify-center",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
