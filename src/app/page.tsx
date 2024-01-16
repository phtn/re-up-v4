import { Brand } from "./brand";
import { Features } from "./features";
import { Wave } from "./wave";

export default function Home() {
  return (
    <main>
      <div className="absolute z-50 flex h-[300px] w-screen items-end px-[75px] font-light md:px-[250px]">
        <Brand />
      </div>
      <div>
        <Wave />
      </div>
      <div className="absolute top-[56vh] z-50 flex h-[300px] w-screen items-end justify-center font-light">
        <Features />
      </div>
    </main>
  );
}
