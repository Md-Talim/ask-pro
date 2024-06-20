"use client";

import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("filter") || "",
  );

  const updateParams = (value: string) => {
    if (activeFilter === value) {
      setActiveFilter(() => "");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl);
    } else {
      setActiveFilter(() => value);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value,
      });

      router.push(newUrl);
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {homePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => updateParams(filter.value)}
          className={clsx(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            activeFilter === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-300",
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
