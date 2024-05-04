import { Header } from "../(components)/header";

export const ProductsContent = () => {
  return (
    <>
      <div className="flex items-center space-x-6">
        <Header title="Products" />
      </div>
      <div className="grid h-[180px] grid-cols-1 bg-white md:grid-cols-3 md:gap-8"></div>
    </>
  );
};
