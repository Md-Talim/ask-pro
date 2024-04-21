"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themeOptions } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";
import clsx from "clsx";
import Image from "next/image";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {theme === "dark" ? (
            <Image
              src="/assets/icons/moon.svg"
              height={24}
              width={24}
              alt="Dark theme icon."
              className="active-theme cursor-pointer"
            />
          ) : (
            <Image
              src="/assets/icons/sun.svg"
              height={24}
              width={24}
              alt="Light theme icon."
              className="active-theme cursor-pointer"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] z-50 mt-3 min-w-[120px] rounded border bg-white py-2 dark:border-dark-400 dark:bg-dark-300">
          {themeOptions.map((themeOption) => (
            <MenubarItem
              key={themeOption.value}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                setTheme(themeOption.value);
                if (themeOption.value !== "system") {
                  localStorage.setItem("theme", themeOption.value);
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={themeOption.icon}
                width={16}
                height={16}
                className={`${theme === themeOption.value && "active-theme"}`}
                alt={themeOption.label}
              />
              <p
                className={clsx(
                  "body-semibold pl-2 text-light-500",
                  theme === themeOption.value
                    ? "text-primary-500"
                    : "text-dark100_light900",
                )}
              >
                {themeOption.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeToggleButton;
