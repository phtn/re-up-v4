import { LineChart, CartesianGrid, Tooltip, Line, Legend } from "recharts";

type ActivityChartProps = {
  width: number;
  height: number;
};

export const PaymentsActivityChart = ({
  width,
  height,
}: ActivityChartProps) => {
  return (
    <LineChart
      className="border-b-[0px] bg-gradient-to-b from-transparent from-75% to-sky-100/30"
      width={width}
      height={height}
      data={data}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <CartesianGrid
        allowReorder="yes"
        strokeOpacity={0.25}
        strokeDasharray="2 2"
      />
      {/* <XAxis dataKey={"name".slice(-1)} /> */}
      <Tooltip />
      <Legend
        margin={{ top: 3 }}
        className="py-2 font-sans text-xs font-semibold tracking-tight"
      />
      <Line type="monotone" dataKey="PHP" stroke="#3b82f6" />
      <Line type="monotone" dataKey="BTC" stroke="#f59e0b" />
      <Line type="monotone" dataKey="USDT" stroke="#14b8a6" />
      <Line type="monotone" dataKey="SOL" stroke="#6366f1" />
    </LineChart>
  );
};

const data = [
  {
    name: "Month ago",
    PHP: 0,
    BTC: 0,
    USDT: 0,
    SOL: 0,
    amt: 0,
  },
  {
    name: "Week ago",
    PHP: 0,
    BTC: 0,
    USDT: 0,
    SOL: 0,
    amt: 0,
  },
  {
    name: "Yesterday",
    PHP: 0,
    BTC: 0,
    USDT: 0,
    SOL: 0,
    amt: 0,
  },
  {
    name: "Today",
    PHP: 0,
    BTC: 0,
    USDT: 0,
    SOL: 0,
    amt: 0,
  },
  {
    name: "Future",
    PHP: 0,
    BTC: 0,
    USDT: 0,
    SOL: 0,
    amt: 0,
  },
];
