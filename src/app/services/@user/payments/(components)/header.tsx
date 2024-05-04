type HeaderProps = {
  title: string;
};
export const Header = ({ title }: HeaderProps) => (
  <div className="flex h-[64px] items-center bg-white text-xl font-semibold tracking-tighter text-copper">
    {title}
  </div>
);
