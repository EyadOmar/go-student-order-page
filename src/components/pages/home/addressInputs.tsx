import CountrySelector from "@/components/ui/countrySelector";
import TextInput from "@/components/ui/textInput";
import { useTranslation } from "react-i18next";

export default function AddressInputs() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 items-end gap-5 max-[380px]:grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3">
          <TextInput
            name="address"
            inputProps={{
              type: "text",
              label: t("register.address.label"),
              placeholder: t("register.address.placeholder"),
            }}
          />
        </div>
        <TextInput
          name="buildingNo"
          inputProps={{
            type: "text",
            placeholder: "Nr",
          }}
        />
      </div>

      <div className="grid items-start gap-5 md:grid-cols-3">
        <TextInput
          name="postalCode"
          inputProps={{
            type: "text",
            placeholder: t("register.postalCode"),
          }}
        />

        <TextInput
          name="city"
          inputProps={{
            type: "text",
            placeholder: t("register.city"),
          }}
        />

        <CountrySelector className="!bg-input h-[49px] w-full font-normal hover:!text-black max-md:col-span-2 max-sm:col-span-1 md:text-sm" />
      </div>
    </div>
  );
}
