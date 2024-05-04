type SorterProps = {
  title: string;
  value?: number;
  onClick?: () => void;
};
export const Sorter = (props: SorterProps) => {
  const { title, value = 0, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="flex h-[56px] flex-col justify-center space-y-1 rounded-[4px] border border-sky-500 px-2.5"
    >
      <div className="font-bold text-copper">{value}</div>
      <div className="text-xs tracking-tight text-clay">{title}</div>
    </div>
  );
};
