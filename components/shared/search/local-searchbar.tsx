"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromKey } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  route: string;
  placeholder: string;
  iconSrc: string;
  iconPosition: "left" | "right";
  styles?: string;
}

const LocalSearchbar = ({
  route,
  placeholder,
  iconSrc,
  iconPosition,
  styles,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [searchTerm, setSearchTerm] = useState(query || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: searchTerm,
        });

        router.push(newUrl);
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromKey({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.push(newUrl);
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, route, pathname, router, searchParams, query]);

  return (
    <div
      className={clsx(
        "background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-lg px-4",
        styles,
      )}
    >
      {iconPosition === "left" && (
        <Image
          src={iconSrc}
          height={24}
          width={24}
          alt="Search icon"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-light400_light500 paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={iconSrc}
          height={24}
          width={24}
          alt="Search icon"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
