import tw from "tailwind-styled-components";
import { Sign } from "./_sign/sign";

export const Actions = () => {
  return (
    <Container>
      <Content>
        <Sign />
      </Content>
    </Container>
  );
};

const Container = tw.div`
  w-full max-w-sm space-y-2
`;
const Content = tw.div`
  flex items-center justify-center 
`;
