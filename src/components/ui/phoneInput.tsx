import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function PhoneNoInput<T extends FieldValues>({
  name,
  label,
  hint,
}: {
  name: Path<T>;
  label?: string;
  hint?: string;
}) {
  const { control } = useFormContext();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { name, value, onChange, ref, onBlur } }) => (
        <FormItem dir="ltr">
          {label && (
            <FormLabel htmlFor={name} dir={language === "ar" ? "rtl" : "ltr"}>
              {label}{" "}
              {hint && <span className="font-bold underline">({hint})</span>}
            </FormLabel>
          )}
          <FormControl>
            <PhoneInput
              value={value}
              onChange={(_, __, ___, formattedValue) => {
                onChange(formattedValue);
              }}
              country={"gr"}
              enableSearch={true}
              searchClass="phoneInputSearch"
              onBlur={onBlur}
              inputClass="phoneInput"
              dropdownClass="phoneDropdown"
              buttonClass="phoneButton"
              inputProps={{
                id: name,
                autoComplete: "phone",
                autoFocus: false,
                name,
                ref,
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
