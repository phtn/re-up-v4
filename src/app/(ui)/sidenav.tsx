import tw from "tailwind-styled-components";
import { Hoverboard } from "./hoverboard";
import { type Children } from "../(main)/types";
import { usePathname } from "next/navigation";
import { cn } from "@src/utils/cn";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  navlist: Group[];
};
export const Sidebar = ({ navlist }: SidebarProps) => {
  return (
    <Container>
      <NavContainer>
        <NavList navlist={navlist} />
      </NavContainer>
    </Container>
  );
};

const NavContainer = ({ children }: Children) => {
  return (
    <Aside>
      <Hoverboard
        snapPoints={[56, 102, 148, 194, 286]}
        parentStyle={`lg:h-[248px]`}
        offset={152}
      >
        {children}
      </Hoverboard>
    </Aside>
  );
};

export interface GroupItemValue {
  label: string;
  desc: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}

export interface Group {
  label: string;
  values: GroupItemValue[];
}

const NavList = ({ navlist }: { navlist: Group[] }) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex overflow-x-scroll lg:space-y-2 portrait:space-x-8 portrait:px-2",
      )}
    >
      {navlist.map((group) => (
        <div key={group.label} className="flex lg:flex-col">
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`} className="px-4">
              <GroupItem>
                <IconContainer>
                  <item.icon
                    strokeWidth={1}
                    className={cn(
                      iconClass,
                      pathname === item.href ? `text-sky-500` : ``,
                    )}
                  />
                </IconContainer>
                <ItemContent
                  className={cn(pathname === item.href ? `text-sky-500` : ``)}
                >
                  <p className="w-full">{item.label}</p>
                </ItemContent>
              </GroupItem>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

const Aside = tw.aside`
  lg:h-full w-full
  z-50 border-ash
  lg:border-b-[0px] md:border-b-[0.33px] portrait:w-screen
  portrait:bg-paper/50
  portrait:border-b-[0.33px] portrait:border-ash

  `;

const Container = tw.div`
  flex w-full
  `;

// type GroupItemContentProps = {
//   link: string | undefined;
//   label: string;
//   desc?: string;
//   pathname: string;
// };
// const GroupItemContent = ({ label, pathname, link }: GroupItemContentProps) => {
//   return (
//     <div
//       className={cn(
//         "flex h-[46px] w-full items-center",
//         pathname === link ? `text-blue-500` : ``,
//       )}
//     >
//       {label}
//     </div>
//   );
// };

const GroupItem = tw.div`
  flex w-full space-x-2 mx-3 portrait:mx-0 portrait:space-x-0
  font-sans font-semibold text-md text-clay tracking-tighter
  transition-colors duration-200 delay-200 ease-in
  md:hover:text-sky-500
  relative z-50
  `;

const ItemContent = tw.div`
  flex h-[46px] portrait:h-[36px] w-full items-center
  `;

const IconContainer = tw.div`
  flex portrait:items-center items-end justify-center h-[33px] portrait:h-[36px] w-[30px]
  `;

const iconClass = `
  group-hover:scale-[120%]
  md:size-[20px] size-[16px] portrait:size-3
  transition-transform duration-200 delay-200 ease-out
  `;
