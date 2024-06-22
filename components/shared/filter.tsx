"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  triggerStyles?: string;
  containerStyles?: string;
}

const Filter = ({ filters, triggerStyles, containerStyles }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let activeFilter = searchParams.get("filter");

  const updateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={clsx("relative", containerStyles)}>
      <Select
        onValueChange={(value) => updateParams(value)}
        defaultValue={activeFilter || ""}
      >
        <SelectTrigger
          className={clsx(
            "body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5",
            triggerStyles,
          )}
        >
          <div className="line-clamp-1 flex-1">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
