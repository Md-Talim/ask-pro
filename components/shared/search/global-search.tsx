import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-xl max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          height={24}
          width={24}
          alt="Search"
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          className="paragraph-regular text-light400_light500 no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
