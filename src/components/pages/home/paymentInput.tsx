import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TextInput from "@/components/ui/textInput";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SEPAImage from "@/assets/sepa.png";
import DepitImage from "@/assets/debitCard.png";
import { Input } from "@/components/ui/input";

export default function PaymentInput() {
  const { watch, control } = useFormContext();
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t("register.payment.label")}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col"
              >
                <FormItem className="flex h-12 items-center gap-3 rounded-md border px-4">
                  <FormControl>
                    <RadioGroupItem value="sepa" />
                  </FormControl>
                  <FormLabel className="block cursor-pointer font-normal">
                    <img
                      src={SEPAImage}
                      alt="SEPA"
                      className="h-12 object-contain"
                    />
                  </FormLabel>
                </FormItem>
                <FormItem className="flex h-12 items-center gap-3 rounded-md border px-4">
                  <FormControl>
                    <RadioGroupItem value="debitCard" />
                  </FormControl>
                  <FormLabel className="block cursor-pointer font-normal">
                    <img
                      src={DepitImage}
                      alt="Debit Card"
                      className="h-10 object-contain"
                    />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <TextInput
        name="cardHolderName"
        inputProps={{ placeholder: t("register.payment.name") }}
      />
      {watch("paymentMethod") === "debitCard" ? (
        <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-5">
          <div className="col-span-2 md:col-span-3">
            <CardNumberInput label="Card Number" />
          </div>
          <CardExpiryInput label="Expiry" />
          <CardCVVInput label="CVV" />
        </div>
      ) : (
        <IBANInput label="IBAN" />
      )}
    </div>
  );
}

export function CardNumberInput({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { control } = useFormContext();

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <FormField
      control={control}
      name={"cardNumber"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              className={className}
              placeholder="Card Number"
              maxLength={19} // 16 digits + 3 spaces
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                field.onChange(formatted);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Specialized Expiry Date Input
export function CardExpiryInput({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { control, setError } = useFormContext();

  const validateExpiry = (expiry: string) => {
    // Remove all non-digits
    const v = expiry.replace(/\D/g, "");

    // Check if starts with 2 digits
    if (v.length < 2) {
      return false;
    }

    // Check if ends with 2 digits
    if (v.length > 4) {
      return false;
    }

    // Check if has 2 slashes
    if (v.split("/").length !== 2) {
      return false;
    }

    // Check if has valid date
    const [month, year] = v.split("/");
    if (+month < 1 || +month > 12 || +year < 1000 || +year > 9999) {
      return false;
    }

    return true;
  };

  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\D/g, "");

    // Add slash after 2 digits
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <FormField
      control={control}
      name={"cardExpiryMonthYear"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              className={className}
              placeholder="MM/YY"
              maxLength={5}
              onChange={(e) => {
                const formatted = formatExpiry(e.target.value);
                field.onChange(formatted);
              }}
              onBlur={(e) => {
                // Optional: Validate on blur and show error
                const isValid = validateExpiry(e.target.value);
                if (!isValid) {
                  setError("cardExpiryMonthYear", {
                    message: "Invalid expiry date",
                  });
                }
                field.onBlur();
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Specialized CVV Input
export function CardCVVInput({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={"cardCVV"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              className={className}
              placeholder="CVV"
              maxLength={4}
              type="password" // Hide CVV for security
              onChange={(e) => {
                // Only allow digits
                const value = e.target.value.replace(/\D/g, "");
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function IBANInput({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { control, setError } = useFormContext();

  const formatIBAN = (value: string) => {
    // Remove all non-alphanumeric characters
    const v = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();

    // Add spaces every 4 characters
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  const validateIBAN = (iban: string) => {
    // Remove spaces for validation
    const cleanIban = iban.replace(/\s/g, "");

    // Basic length check (IBAN should be 15-34 characters)
    if (cleanIban.length < 15 || cleanIban.length > 34) {
      return false;
    }

    // Check if starts with 2 letters (country code)
    if (!/^[A-Z]{2}/.test(cleanIban)) {
      return false;
    }

    // Basic IBAN checksum validation (simplified)
    try {
      // Move first 4 characters to end
      const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);

      // Replace letters with numbers (A=10, B=11, ..., Z=35)
      const numericString = rearranged.replace(/[A-Z]/g, (char) =>
        (char.charCodeAt(0) - 55).toString(),
      );

      // Simple mod 97 check (for basic validation)
      // Note: For production, use a proper IBAN validation library
      const remainder = BigInt(numericString) % 97n;
      return remainder === 1n;
    } catch {
      return false;
    }
  };

  return (
    <FormField
      control={control}
      name={"iban"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              className={className}
              placeholder="IBAN"
              maxLength={42} // 34 characters + 8 spaces max
              onChange={(e) => {
                const formatted = formatIBAN(e.target.value);
                field.onChange(formatted);
              }}
              onBlur={(e) => {
                // Optional: Validate on blur and show error
                const isValid = validateIBAN(e.target.value);
                if (!isValid) {
                  setError("iban", { message: "Invalid IBAN" });
                }
                field.onBlur();
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
