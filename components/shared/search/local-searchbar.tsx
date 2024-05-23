"use client";

import { Input } from "@/components/ui/input";
import clsx from "clsx";
import Image from "next/image";

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
        onChange={() => {}}
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
