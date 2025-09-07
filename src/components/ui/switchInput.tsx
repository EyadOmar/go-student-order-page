import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

export function SwitchInput<T extends FieldValues>({
  name,
  label,
  className,
}: {
  name: Path<T>;
  label: string;
  className?: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex items-center gap-2", className)}>
          <FormControl>
            <Switch
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="text-xs capitalize lg:text-sm" htmlFor={name}>
            {label.split("-")[0]} - 
            <span className="uppercase">{label.split("-")[1]}</span>
          </FormLabel>
        </FormItem>
      )}
    />
  );
}
