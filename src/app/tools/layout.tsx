import tw from "tailwind-styled-components";
import Tools from "./page";
import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { type ReactNode } from "react";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Header />
      <Tools />
      {children}
    </Container>
  );
}

const Container = tw.div`
  h-screen
`;

const Header = () => (
  <div className="flex h-[56px] items-center border-b border-neutral-600">
    <Logo />
    <Title />
  </div>
);

const Logo = () => (
  <div className="flex h-[50px] w-[50px] items-center justify-center">
    <Link href="/" className="rounded-full bg-cyan-100 p-[2px]">
      <CodeIcon className="h-4 w-4 text-pink-600" />
    </Link>
  </div>
);

const Title = () => (
  <div className="item-center flex justify-center px-4">
    <h1 className="font-mono text-[12px] font-bold text-cyan-50/50">
      Re-Up Dev Tools
    </h1>
  </div>
);
