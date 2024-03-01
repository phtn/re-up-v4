import tw from "tailwind-styled-components";
import { WebhookNav } from "./components";

export const WebhookDashboard = () => {
  return (
    <Container>
      <WebhookNav />
    </Container>
  );
};

const Container = tw.div`
  h-[500px] bg-mojo border
`;

// const ContentWrap = tw.div`
//   grid h-fit w-full grid-cols-1 bg-void px-[16px] md:grid-cols-2 md:px-[72px]
// `;
