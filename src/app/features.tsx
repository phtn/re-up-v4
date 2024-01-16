/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YQ2leEd87aX
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from "@@components/card";

type FeatureData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
};

const data: FeatureData[] = [
  { id: 0, title: "Accept", description: "Online Payments", tags: [""] },
  { id: 1, title: "Automate", description: "Business Process", tags: [""] },
  { id: 2, title: "Simplify", description: "Workload", tags: [""] },
];

export function Features() {
  return (
    <div className="z-50 grid grid-cols-3 gap-4 px-6">
      {data.map((item) => (
        <Card key={item.id} className="border-cyan-500/30 border-opacity-50">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-cyan-300 to-cyan-200 bg-clip-text text-[1.75rem] font-extrabold text-transparent">
              {item.title}
            </CardTitle>
            <CardTitle className="bg-gradient-to-r from-cyan-100/50 to-cyan-200 bg-clip-text text-lg text-transparent">
              {item.description}
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
