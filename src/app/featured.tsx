import { Card, CardHeader, CardTitle } from "@@components/card";
import { WebhookIcon } from "lucide-react";
import Link from "next/link";
import { memo, type ComponentType } from "react";
import tw from "tailwind-styled-components";
import { XGrid } from "./_components/grid";
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

const withMapping = (
  Comp: ComponentType<ItemCompProps>,
  items: FeatureData[],
) => {
  const WithMappingComponent = () => (
    <>
      {items.map((item, index) => (
        <Comp key={index} item={item} />
      ))}
    </>
  );

  WithMappingComponent.displayName = `WithMapping(${Comp.displayName ?? Comp.name ?? "Component"})`;

  return WithMappingComponent;
};

const Features = withMapping(ItemComp, data);

export const Featured = memo(function Featured() {
  return (
    <Container>
      <GridCol>
        <Features />
      </GridCol>
    </Container>
  );
});

Featured.displayName = "Featured";

const Container = tw.div`
  absolute z-50 w-screen items-end justify-center md:h-[20vh] md:px-24
`;
const GridCol = tw.div`
  z-50 grid w-full grid-cols-1 gap-4 px-6 md:grid-cols-3
`;
const Item = tw(Card)`
  w-full md:max-w-[300px] rounded-none border-cord/50
`;
const Content = tw.div`
  flex items-center justify-center space-x-6 w-full 
`;
const Title = tw(CardTitle)`
  font-extrabold text-transparent md:text-xl -mb-1
  bg-gradient-to-r from-orange-200 via-rose-100/80 via-[30%] to-sky-900 to-[90%] bg-clip-text  
`;
const Subtext = tw(CardTitle)`
  bg-clip-text text-sm text-transparent font-medium
  bg-gradient-to-r from-sky-200/80 to-cyan-100/60 
`;
