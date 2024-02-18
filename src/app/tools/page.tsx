import { cookies } from "next/headers";
import { Content } from "./content";

const Tools = () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed?.value;

  return (
    <Content
      defaultCollapsed={true}
      defaultLayout={defaultLayout}
      navCollapsedSize={4}
    />
  );
};

export default Tools;
