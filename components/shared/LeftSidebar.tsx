import NavigationLink from "@/components/shared/NavigationLink";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <section className="background-light900_dark200 fixed left-0 bottom-0 h-full flex flex-col justify-between pb-6 pt-36 max-md:pb-14 px-6 max-sm:hidden shadow-light-300 dark:shadow-none">
      <nav className="space-y-6">
        {sidebarLinks.map((link) => (
          <NavigationLink {...link} isDesktop />
        ))}
      </nav>

      <SignedOut>
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
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
