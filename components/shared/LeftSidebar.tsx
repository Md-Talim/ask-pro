"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 fixed left-0 bottom-0 h-full flex flex-col justify-between pb-6 pt-36 max-md:pb-14 px-6 max-sm:hidden shadow-light-300 dark:shadow-none">
      <nav className="space-y-6">
        {sidebarLinks.map((link) => {
          const isActiveLink =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              className={clsx(
                isActiveLink
                  ? "primary-gradient text-light-900 rounded-lg"
                  : "text-dark300_light900",
                "flex items-center gap-4 p-4"
              )}
            >
              <Image
                src={link.imageUrl}
                height={20}
                width={20}
                alt={link.label}
                className={clsx(!isActiveLink && "invert-colors")}
              />

              <p
                className={clsx(
                  isActiveLink ? "base-bold" : "base-medium",
                  "max-lg:hidden"
                )}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-y-3">
        <Link href="/sign-in">
          <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/account.svg"
              height={24}
              width={24}
              alt="Login"
              className="invert-colors lg:hidden"
            />
            <span className="primary-text-gradient max-lg:hidden">Login</span>
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="small-medium btn-tertiary text-dark400_light900 light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/sign-up.svg"
              height={24}
              width={24}
              alt="Sign up"
              className="invert-colors lg:hidden"
            />
            <span className="max-lg:hidden">Signup</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LeftSidebar;
