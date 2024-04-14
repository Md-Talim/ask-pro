"use client";

import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import clsx from "clsx";

const HomeFilters = () => {
  const active = "";

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {homePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => {}}
          className={clsx(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            active === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-300"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
