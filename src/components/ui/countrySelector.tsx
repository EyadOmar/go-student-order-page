import { getCountries } from "@/api/countries";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CountrySelector({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const options = React.useMemo(() => {
    return data && Array.isArray(data)
      ? data?.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }))
      : [];
  }, [data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isFetching || isLoading}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <span className="max-w-full truncate">
            {value ? options.find((o) => o.value === value)?.label : "Country"}
          </span>
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            {data && Array.isArray(data) ? (
              <CommandGroup>
                {options.map((o) => (
                  <CommandItem
                    key={o.value}
                    value={o.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {o.label}
                    <Check
                      className={cn(
                        "ms-auto",
                        value === o.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No Country found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
