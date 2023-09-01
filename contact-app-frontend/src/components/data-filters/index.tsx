import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calender";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Input } from "../ui/input";

interface TextFilterProps {
  value: string | undefined;
  onChange: (newValue: string | undefined) => void;
}

export const TextFilter: React.FC<TextFilterProps> = ({ value, onChange }) => {
  const searchValue = value || "";

  return (
    <Input
      placeholder="Search"
      value={searchValue}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

interface DateFilterProps {
  value: string | undefined;
  onChange: (date: string | undefined) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ value, onChange }) => {
  const selectedValue = value ? new Date(value) : undefined;

  return (
    <Popover>
      <Button
        variant={"outline"}
        className={cn(
          "w-[150px] text-left font-normal",
          !value && "text-muted-foreground"
        )}
      >
        <div className="items-base flex gap-4">
          <PopoverTrigger asChild>
            <div className="flex gap-2">
              {!value ? (
                <Icons.Calendar className="ml-auto h-4 w-4 opacity-50" />
              ) : null}
              <span className="text-[11px]">
                {value ? format(new Date(value), "yyyy-MM-dd") : "DOB"}
              </span>
            </div>
          </PopoverTrigger>
          <div onClick={() => onChange(undefined)}>
            <Icons.Cross className="ml-4 mt-[0.5px] h-4 w-4 opacity-50" />
          </div>
        </div>
      </Button>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedValue}
          onSelect={(newDate) => {
            if (newDate instanceof Date) {
              onChange(format(newDate, "yyyy-MM-dd"));
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

interface DropdownFilterProps {
  value: any;
  onChange: (newValue: any) => void;
  options: { value: any; label: string }[];
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  value,
  onChange,
  options,
}) => {
  let dropdownValue;

  if (value === false) {
    dropdownValue = "Inactive";
  }

  if (value) {
    dropdownValue = options.find((option) => option.value === value)?.label;
  } else {
    dropdownValue = "Select";
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[140px] justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {dropdownValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup>
            {options.map((option, index) => (
              <CommandItem
                value={option.label}
                key={index}
                onSelect={() => onChange(option.value)}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
