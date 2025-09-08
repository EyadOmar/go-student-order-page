import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function MonthsNoSelect() {
  const { watch, setValue } = useFormContext();
  const value = watch("totalMonths");
  const onChange = (value: number) => {
    setValue("totalMonths", value);
  };
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <Month onChange={onChange} number={6} isActive={value === 6} />
      <Month onChange={onChange} number={9} isActive={value === 9} />
      <Month onChange={onChange} number={12} isActive={value === 12} />
      <Month onChange={onChange} number={18} isActive={value === 18} />
      <Month onChange={onChange} number={24} isActive={value === 24} />
      <Month onChange={onChange} number={36} isActive={value === 36} />
    </div>
  );
}

const Month = ({
  number,
  onChange,
  isActive,
}: {
  number: number;
  onChange: (value: number) => void;
  isActive?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => onChange(number)}
      type="button"
      disabled={isActive}
      className="text-muted-foreground disabled:bg-primary disabled:text-primary-foreground hover:bg-secondary hover:text-secondary-foreground rounded bg-white px-6 py-4 text-center transition-colors duration-200 ease-in-out"
    >
      {number} {t("order.months")}
    </button>
  );
};
