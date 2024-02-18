import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from "@@components/card";
import tw from "tailwind-styled-components";
import { type FeatureData } from "./static";
import Link from "next/link";
import { XGrid } from "./_components/grid";
import { WebhookIcon } from "lucide-react";

export const data: FeatureData[] = [
  {
    id: 0,
    title: "Webhooks",
    description: "Create webhook endpoints",
    tags: [""],
    href: "/webhooks",
  },
];

export function Features() {
  return (
    <Container>
      {data.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          role="button"
          aria-label="Webhooks"
        >
          <Item>
            <XGrid>
              <div className="flex items-center space-x-4">
                <WebhookIcon className="text-orange-100" />
                <CardHeader>
                  <Title>{item.title}</Title>
                  <Subtext>{item.description}</Subtext>
                  <CardDescription></CardDescription>
                </CardHeader>
              </div>
            </XGrid>
          </Item>
        </Link>
      ))}
    </Container>
  );
}

const Container = tw.div`
  z-50 grid w-full grid-cols-1 gap-4 px-6 md:grid-cols-4
`;
const Item = tw(Card)`
  w-full bg-gradient-to-b from-orange-500 to-cyan-500 py-[1.5px] rounded-[11px]
`;
const Title = tw(CardTitle)`
  font-extrabold text-transparent leading-0 md:text-xl
  bg-gradient-to-r from-orange-200 via-rose-100/80 via-[30%] to-sky-900 to-[90%] bg-clip-text  
`;
const Subtext = tw(CardTitle)`
  bg-clip-text text-sm text-transparent font-medium
  bg-gradient-to-r from-sky-200/80 to-cyan-100/60 
`;
