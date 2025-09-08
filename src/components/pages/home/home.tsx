import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import { PhoneNoInput } from "@/components/ui/phoneInput";
import TextInput from "@/components/ui/textInput";
import { SwitchInput } from "@/components/ui/switchInput";
import { isPhoneValid } from "@/lib/utils";
import PaymentInput from "./paymentInput";
import AddressInputs from "./addressInputs";
import MonthsNoSelect from "./monthsNoSelect";
import Recipt from "./recipt";
export default function Home() {
  const { t } = useTranslation();
  const formSchema = z.object({
    loginPhone: z
      .string()
      .min(1, t("register.errors.required"))
      .refine((value) => isPhoneValid(value), {
        message: t("register.errors.invalidPhone"),
      }),
    contactPhone: z.string().refine((value) => isPhoneValid(value), {
      message: t("register.errors.invalidPhone"),
    }),
    email: z
      .string()
      .min(1, t("register.errors.required"))
      .refine(
        (value) => {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return emailRegex.test(value);
        },
        {
          message: t("register.errors.invalidEmail"),
        },
      ),
    name: z.string().min(1, t("register.errors.required")),
    address: z.string().min(1, t("register.errors.required")),
    monthlySessions: z.number(),
    paymentMethod: z.string(),
    cardHolderName: z.optional(z.string()),
    cardNumber: z.optional(z.string()),
    cardExpiryMonthYear: z.optional(z.string()),
    iban: z.optional(z.string()),
    cardCVV: z.optional(z.string()),
    payInAdvance: z.boolean(),
    totalMonths: z.number(),
    buildingNo: z.optional(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginPhone: "",
      contactPhone: "",
      email: "",
      name: "",
      address: "",
      monthlySessions: 6,
      paymentMethod: "debitCard",
      cardHolderName: "",
      cardNumber: "",
      cardExpiryMonthYear: "",
      cardCVV: "",
      payInAdvance: false,
      totalMonths: 6,
      buildingNo: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="min-h-screen-header container py-6 md:py-8 lg:py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3"
        >
          <section className="rounded bg-white px-8 py-10 xl:col-span-2">
            <div className="mb-8 space-y-2 text-center">
              <h1 className="font-bold text-pretty md:text-xl lg:text-2xl">
                {t("register.title")}
              </h1>
              <h2 className="text-sm md:text-base lg:text-lg">
                {t("register.subtitle")}
              </h2>
            </div>
            <div className="space-y-6">
              <PhoneNoInput
                name="loginPhone"
                label={`${t("register.loginPhone")} (${t("register.prefer")})`}
              />
              <PhoneNoInput
                name="contactPhone"
                label={t("register.contactPhone")}
              />
              <TextInput
                name="email"
                inputProps={{
                  type: "email",
                  label: t("register.email"),
                }}
              />
              <TextInput
                name="name"
                inputProps={{
                  type: "text",
                  label: t("register.name"),
                }}
              />
              <AddressInputs />
              <PaymentInput />
            </div>
          </section>
          <section className="h-fit space-y-8 bg-white px-8 py-10 lg:sticky lg:end-0 lg:top-10">
            <h2 className="font-semibold text-pretty max-lg:text-center md:text-lg lg:text-xl">
              {t("order.title")}
            </h2>
            <MonthsNoSelect />
            <SwitchInput name="payInAdvance" label={t("order.inAdvance")} />
            <Recipt />
            <CTA />
          </section>
        </form>
      </Form>
    </main>
  );
}

const CTA = () => {
  const { t } = useTranslation();
  return (
    <button
      type="submit"
      className="from-primary to-secondary w-full rounded-md px-6 py-4 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:scale-[0.98] hover:brightness-110 md:text-base lg:text-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
    >
      {t("order.cta")}
    </button>
  );
};
