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
  { id: 0, title: "Simplify", description: "Workload", tags: [""] },
  { id: 1, title: "Accept", description: "Online Payments", tags: [""] },
  { id: 2, title: "Automate", description: "Business Process", tags: [""] },
  { id: 3, title: "Secure", description: "Backend Service", tags: [""] },
  { id: 4, title: "Cloud", description: "Realtime Database", tags: [""] },
  { id: 5, title: "Data", description: "Reporting & Analysis", tags: [""] },
  { id: 6, title: "Insightful", description: "Projections", tags: [""] },
  {
    id: 7,
    title: "Multi-Platform",
    description: "App Development",
    tags: [""],
  },
];

export function Features() {
  return (
    <div className="z-50 grid w-full grid-cols-1 gap-4 px-6 pb-6 md:grid-cols-4">
      {data.map((item) => (
        <Card
          key={item.id}
          className="w-full border-cyan-500/30 border-opacity-50"
        >
          <CardHeader>
            <CardTitle className="mb-[-12px] bg-gradient-to-r from-cyan-300 to-cyan-50 bg-clip-text text-[1.75rem] font-extrabold text-transparent">
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
