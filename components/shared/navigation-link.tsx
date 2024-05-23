"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  route: string;
  imageUrl: string;
  label: string;
  isDesktop?: boolean;
}

const NavigationLink = ({ route, imageUrl, label, isDesktop }: Props) => {
  const pathname = usePathname();
  const isActiveLink =
    (pathname.includes(route) && route.length > 1) || pathname === route;

  return (
    <Link
      href={route}
      className={clsx(
        isActiveLink
          ? "primary-gradient rounded-lg text-light-900"
          : "text-dark300_light900",
        "flex items-center gap-x-4 p-4",
      )}
    >
      <Image
        src={imageUrl}
        height={20}
        width={20}
        alt={label}
        className={clsx(!isActiveLink && "invert-colors")}
      />

      <p
        className={clsx(
          isActiveLink ? "base-bold" : "base-medium",
          isDesktop && "max-lg:hidden",
        )}
      >
        {label}
      </p>
    </Link>
  );
};

export default NavigationLink;
