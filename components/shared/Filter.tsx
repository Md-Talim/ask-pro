import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  triggerStyles?: string;
  containerStyles?: string;
}

const Filter = ({ filters, triggerStyles, containerStyles }: Props) => {
  return (
    <div className={clsx("relative", containerStyles)}>
      <Select>
        <SelectTrigger
          className={clsx(
            "body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5",
            triggerStyles
          )}
        >
          <div className="line-clamp-1 flex-1">
            <SelectValue placeholder="Select a Fitler" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="text-dark500_light700"
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
