import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function Recipt() {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  return (
    <div className="mt-8 space-y-4">
      <Info text={t("order.sessions")} number={watch("monthlySessions")} />
      <Info text={t("order.regular")} number={10} />
      <Info text={t("order.price")} number={10} />
      <Info text={t("order.discount", { discount: 10 })} number={10} />
      <hr className="border-accent my-4" />
      <Info text={t("order.setup")} number={0} />
      <Info text={t("order.total")} number={10} />
    </div>
  );
}

const Info = ({ text, number }: { text: string; number: number }) => {
  return (
    <div className="flex items-center justify-between text-xs md:text-sm lg:text-base">
      <span className="text-muted-foreground uppercase">{text}</span>
      <span className="font-medium">{`${number}`}</span>
    </div>
  );
};
