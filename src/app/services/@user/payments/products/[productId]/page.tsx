import { ProductContent } from "./content";

export type CustomerPageProps = {
  params: {
    productId: string;
  };
};
const ProductPage = ({ params }: CustomerPageProps) => {
  return <ProductContent id={params.productId} />;
};
export default ProductPage;
