import { Flex } from "@@ui/flex";
import tw from "tailwind-styled-components";
import { Navbar } from "../../(components)/navbar";

export const ServicesNavbar = () => {
  return (
    <div className="flex h-[36px] w-full items-center justify-between overflow-x-scroll bg-void sm:h-[72px]">
      <Navbar.Header>
        <Flex spacing={`space-x-[30px] h-full px-6 items-center`}>
          <SecondaryItem label="All Services" />
          <VSeparator />
        </Flex>
      </Navbar.Header>
    </div>
  );
};

type ItemProps = {
  label: string | undefined;
};

const SecondaryItem = ({ label }: ItemProps) => (
  <Flex className="items-center">
    <Label>{label ?? ""}</Label>
  </Flex>
);

const VSeparator = () => (
  <div className="flex h-[72px] items-center justify-center">
    <div className="h-[24px] border-r-[0.33px] border-dashed border-opus/50"></div>
  </div>
);

const Label = tw.h2`
 text-zap font-sans text-xs md:text-sm font-semibold tracking-tighter
`;
