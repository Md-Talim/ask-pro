"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Logo = () => (
  <Link href="/" className="flex items-center gap-1">
    <Image
      src="/assets/images/site-logo.svg"
      height={24}
      width={24}
      alt="FrontFlow Logo"
    />

    <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 sm:hidden">
      Dev <span className="text-primary-500">Overflow</span>
    </p>
  </Link>
);

const Navigations = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-y-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActiveLink =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <SheetClose key={link.label}>
            <Link
              href={link.route}
              className={clsx(
                isActiveLink
                  ? "primary-gradient text-light-900 rounded-lg"
                  : "text-dark300_light900",
                "flex items-center gap-x-4 p-4"
              )}
            >
              <Image
                src={link.imageUrl}
                height={20}
                width={20}
                alt={link.label}
                className={clsx(!isActiveLink && "invert-colors")}
              />

              <p className={clsx(isActiveLink ? "base-bold" : "base-medium")}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </nav>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          height={36}
          width={36}
          alt="Menu"
          className="invert-colors cursor-pointer sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Logo />

        <SheetClose>
          <Navigations />
        </SheetClose>

        <SignedOut>
          <div className="flex flex-col gap-y-3">
            <SheetClose asChild>
              <Link href={"/sign-in"}>
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Login</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/sign-up"}>
                <Button className="small-medium btn-tertiary text-dark400_light900 light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  Signup
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
