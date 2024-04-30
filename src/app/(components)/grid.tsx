import { cn } from "@src/utils/cn";
import tw from "tailwind-styled-components";

type GridColProps = {
  cols?: number;
  children: React.ReactNode;
  top?: number;
};
export const GridCol = ({ cols, children, top }: GridColProps) => {
  switch (cols) {
    case 3:
      return <Tri>{children}</Tri>;
    case 4:
      return <Quad>{children}</Quad>;
    case 5:
      return <Quint>{children}</Quint>;
    default:
      return (
        <Bin className={cn(top ? () => `pt-${top}[px]` : ``)}>{children}</Bin>
      );
  }
};

const Bin = tw.div`
  grid grid-cols-1 md:grid-cols-2
`;

const Tri = tw.div`
  grid grid-cols-1 md:grid-cols-3
`;
const Quad = tw.div`
  grid grid-cols-1 md:grid-cols-4
`;
const Quint = tw.div`
  grid grid-cols-1 md:grid-cols-5
`;
