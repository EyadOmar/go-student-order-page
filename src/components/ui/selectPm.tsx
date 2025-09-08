import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function SelectPm<T extends FieldValues>({
  name,
  label,
  className,
}: {
  name: Path<T>;
  label: string;
  className?: string;
}) {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const options = [
    {
      label: `4 ${t("register.sessions.name")}`,
      value: "4",
    },
    {
      label: `8 ${t("register.sessions.name")}`,
      value: "8",
    },
    {
      label: `12 ${t("register.sessions.name")}`,
      value: "12",
    },
  ];
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={cn("h-12 w-full", className)}>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
