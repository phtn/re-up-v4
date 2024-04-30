export const Footer = () => {
  return (
    <div className="absolute top-[75vh] flex h-20 w-screen items-center justify-center bg-black px-2 text-[12px] font-light text-neutral-500 md:top-[90vh] md:px-32">
      <div className="flex items-center justify-center space-x-4 font-jet">
        <div className="h-[12px] w-[12px] bg-[url('/svg/logo_light_v2.svg')] bg-cover"></div>
        <p className="text-[10px] font-medium">re-up.ph</p>
        <p className="text-[10px] text-cord">꒛</p>
        <p className="text-[10px]">
          all rights reserved. {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
