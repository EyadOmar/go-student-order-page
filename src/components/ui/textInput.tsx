import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export default function TextInput<T extends FieldValues>({
  name,
  inputProps,
  className,
}: {
  name: Path<T>;
  inputProps: InputProps;
  className?: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {inputProps.label && (
            <FormLabel htmlFor={inputProps.id}>{inputProps.label}</FormLabel>
          )}
          <FormControl>
            <Input className={className} {...inputProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
