"use client";

import { cn } from "@@utils/cn";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.animation = "rotate 5s linear infinite";
    }
  }, []);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "flex items-center justify-center py-20",
          containerClassName,
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          className={cn(
            "relative flex items-center justify-center transition-all duration-300 ease-linear",
            className,
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.animation = "rotate 5s linear infinite";
    }
  }, []);

  return (
    <div
      ref={bodyRef}
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
};

// export const CardItem = ({
//   as: Tag = "div",
//   children,
//   className,
//   style,
// }: {
//   as?: keyof JSX.IntrinsicElements;
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
// }) => {
//   const itemRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     if (itemRef.current) {
//       itemRef.current.style.animation = "rotate 5s linear infinite";
//     }
//   }, []);

//   return (
//     <Tag
//       ref={itemRef}
//       className={cn(
//         "absolute left-0 top-0 flex h-full w-full items-center justify-center",
//         className,
//       )}
//       style={style}
//     >
//       {children}
//     </Tag>
//   );
// };

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
