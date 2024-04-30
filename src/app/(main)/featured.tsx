import { Card, CardHeader, CardTitle } from "@@ui/card";
import { WebhookIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import tw from "tailwind-styled-components";
import { XGrid } from "@@ui/grid";
import { type FeatureData } from "./static";

export const data: FeatureData[] = [
  {
    id: 0,
    title: "Webhooks",
    description: "Create webhook endpoints",
    tags: [""],
    href: "/webhooks",
  },
];

interface ItemCompProps {
  item: FeatureData;
}

const ItemComp = ({ item }: ItemCompProps) => (
  <Link href={item.href} role="button" aria-label="Webhooks">
    <Item>
      <XGrid>
        <Content>
          <WebhookIcon className="text-orange-50/90" />
          <CardHeader>
            <Title>{item.title}</Title>
            <Subtext>{item.description}</Subtext>
          </CardHeader>
        </Content>
      </XGrid>
    </Item>
  </Link>
);

ItemComp.displayName = "ItemComp";
// HOC is asking for a component display name

export const Featured = memo(function Featured() {
  return (
    <Item>
      <p>Webhooks</p>
    </Item>
  );
});

Featured.displayName = "Featured";

const Item = tw(Card)`
  w-full md:max-w-[300px] rounded-none border-cord/30
`;
const Content = tw.div`
  flex items-center justify-center space-x-6 w-full
`;
const Title = tw(CardTitle)`
  font-extrabold text-transparent md:text-xl -mb-1
  bg-gradient-to-r from-orange-200 via-sky-100/80 via-[30%] to-sky-900 to-[90%] bg-clip-text
`;
const Subtext = tw(CardTitle)`
  bg-clip-text text-sm text-transparent font-medium
  bg-gradient-to-r from-sky-200/80 to-cyan-100/60
`;
