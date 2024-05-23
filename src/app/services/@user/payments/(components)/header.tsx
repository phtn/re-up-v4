import { Button } from "@src/app/(ui)/button";
import { cn } from "@src/utils/cn";
import { Disc3Icon, PlusIcon } from "lucide-react";

type HeaderProps = {
  title: string;
};
export const Header = ({ title }: HeaderProps) => (
  <div className="flex h-[64px] items-center bg-white text-xl font-semibold tracking-tighter text-copper portrait:h-[48px] portrait:text-lg">
    {title}
  </div>
);

type FormHeaderProps = {
  title: string;
  onClick: () => void;
  loading: boolean;
};
export const FormHeader = (props: FormHeaderProps) => {
  const { title, onClick, loading } = props;
  return (
    <div className="flex items-center space-x-4">
      <Header title={title} />
      <Button
        size={"icon"}
        onClick={onClick}
        className={cn(
          `size-5 rounded-full bg-sky-500 p-0.5 text-white`,
          loading ? `animate-spin stroke-1` : ``,
        )}
      >
        {loading ? <Disc3Icon /> : <PlusIcon />}
      </Button>
    </div>
  );
};
