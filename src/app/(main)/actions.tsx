import tw from "tailwind-styled-components";
import { Sign } from "../(login)/sign";

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
  w-full border-0 border-dyan py-3
`;
const Content = tw.div`
  flex items-center justify-center border-0 border-red-500
`;
