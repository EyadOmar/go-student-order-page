import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

// --- Constants for better maintainability ---
const REGULAR_PRICE_PER_SESSION = 29.6;
const BASE_DISCOUNT_PERCENT = 4;
const ADVANCE_PAYMENT_DISCOUNT_PERCENT = 5; // Additional discount
const SETUP_FEE = 0;

// --- Helper function for consistent currency formatting ---
const formatCurrency = (value: number) => `${value.toFixed(2)}€`;

export default function Recipt() {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  // --- Input values from the form ---
  const monthlySessions = watch("monthlySessions") || 8;
  const months = watch("totalMonths") || 1;
  const payInAdvance = watch("payInAdvance") || false;

  // --- Core Calculations ---
  const totalSessions = monthlySessions * months;

  // 1. Determine the total discount percentage
  const totalDiscountPercent = payInAdvance
    ? BASE_DISCOUNT_PERCENT + ADVANCE_PAYMENT_DISCOUNT_PERCENT
    : BASE_DISCOUNT_PERCENT;

  // 2. Calculate the price per session after all applicable discounts
  const pricePerSessionAfterDiscount =
    REGULAR_PRICE_PER_SESSION * (1 - totalDiscountPercent / 100);

  // 3. Calculate totals based on the final price
  const regularTotal = totalSessions * REGULAR_PRICE_PER_SESSION;
  const subtotalAfterDiscount = totalSessions * pricePerSessionAfterDiscount;
  const totalDiscountAmount = regularTotal - subtotalAfterDiscount;
  const finalTotal = subtotalAfterDiscount + SETUP_FEE;

  return (
    <div className="mt-8 space-y-4">
      <Info text={t("order.sessions")} number={totalSessions} />
      <Info
        text={t("order.regular")}
        number={formatCurrency(REGULAR_PRICE_PER_SESSION)}
      />
      <Info
        text={t("order.price")}
        number={formatCurrency(pricePerSessionAfterDiscount)}
      />
      <Info
        text={t("order.discount", {
          discount: totalDiscountPercent.toFixed(1),
        })}
        number={`-${formatCurrency(totalDiscountAmount)}`}
        className="text-green-500"
      />
      <hr className="border-accent my-4" />
      <Info
        text={t("order.setup")}
        number={formatCurrency(SETUP_FEE)}
        className="text-blue-500"
      />
      <Info
        text={t("order.total")}
        number={formatCurrency(finalTotal)}
        className="font-semibold text-blue-600"
      />
    </div>
  );
}

const Info = ({
  text,
  number,
  className,
}: {
  text: string;
  number: string | number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between text-xs md:text-sm lg:text-base",
        className,
      )}
    >
      <span className="text-muted-foreground uppercase">{text}</span>
      <span className="font-medium">{`${number}`}</span>
    </div>
  );
};
