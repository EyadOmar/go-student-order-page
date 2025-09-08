import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function TermsInput() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  return (
    <FormField
      control={control}
      name="terms"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-start gap-3">
            <FormControl>
              <Checkbox
                className="border-ring"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-muted-foreground inline text-xs text-wrap normal-case lg:text-sm">
              {t("order.accept")}{" "}
              <a
                href="#"
                className="text-secondary hover:text-primary inline underline transition-colors"
              >
                {t("order.terms")}
              </a>{" "}
              {t("order.accept2")}{" "}
              <a
                href="#"
                className="text-secondary hover:text-primary inline underline transition-colors"
              >
                {t("order.privacy")}
              </a>
              {""} {t("order.accept3")}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
