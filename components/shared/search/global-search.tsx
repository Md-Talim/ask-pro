"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GlobalResults from "./global-results";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchConainerRef = useRef<HTMLDivElement | null>(null);

  const query = searchParams.get("global");
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [isOpen, setIsOpen] = useState(query || false);

  useEffect(() => {
    const handleCloseResults = (event: MouseEvent) => {
      if (
        searchConainerRef.current &&
        searchConainerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(() => false);
        setSearchTerm(() => "");
      }
    };

    setIsOpen(() => false);
    document.addEventListener("click", handleCloseResults);

    return () => document.removeEventListener("click", handleCloseResults);
  }, [pathname]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: searchTerm,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromKey({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, pathname, router, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-xl max-lg:hidden"
      ref={searchConainerRef}
    >
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
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          placeholder="Search globally"
          className="paragraph-regular text-light400_light500 no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResults />}
    </div>
  );
};

export default GlobalSearch;
