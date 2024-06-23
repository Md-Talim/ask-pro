"use client";

import { globalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("type") || "",
  );

  const handleUpdateParams = (value: string) => {
    if (activeFilter === value) {
      setActiveFilter(() => "");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActiveFilter(() => value);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value,
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type:</p>
      <div className="flex gap-3">
        {globalSearchFilters.map((filter) => (
          <button
            type="button"
            key={filter.value}
            className={clsx(
              "light-border-2 small-medium rounded-2xl px-5 py-2 capitalize",
              activeFilter === filter.value
                ? "bg-primary-500 text-light-900"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500 dark:text-light-800 dark:hover:text-primary-500",
            )}
            onClick={() => handleUpdateParams(filter.value)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
