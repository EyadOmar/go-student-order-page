import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import { PhoneNoInput } from "@/components/ui/phoneInput";
import TextInput from "@/components/ui/textInput";
import CountrySelector from "@/components/ui/countrySelector";
import { SwitchInput } from "@/components/ui/switchInput";
import { isPhoneValid } from "@/lib/utils";
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
    cardExpiryMonth: z.optional(z.string()),
    cardExpiryYear: z.optional(z.string()),
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
      paymentMethod: "",
      cardHolderName: "",
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
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
          className="mx-auto grid min-h-[500px] grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3"
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

              {/* address Inputs  */}
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

                <div className="grid gap-5 md:grid-cols-3">
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
            </div>
          </section>
          <section className="space-y-8 px-8 py-10">
            <h2 className="font-semibold text-pretty max-lg:text-center md:text-lg lg:text-xl">
              {t("order.title")}
            </h2>
            <MonthsNoSelect
              value={form.watch("totalMonths")}
              onChange={(value: number) => {
                form.setValue("totalMonths", value);
              }}
            />
            <SwitchInput name="payInAdvance" label={t("order.inAdvance")} />
            <div className="mt-8 space-y-4">
              <Info
                text={t("order.sessions")}
                number={form.watch("monthlySessions")}
              />
              <Info text={t("order.regular")} number={10} />
              <Info text={t("order.price")} number={10} />
              <Info text={t("order.discount", { discount: 10 })} number={10} />
              <hr className="my-4 border-white" />
              <Info text={t("order.setup")} number={0} />
              <Info text={t("order.total")} number={10} />
            </div>

            <button
              type="submit"
              className="from-primary to-secondary w-full rounded-md px-6 py-4 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:scale-[0.98] hover:brightness-110 md:text-base lg:text-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
            >
              {t("order.cta")}
            </button>
          </section>
        </form>
      </Form>
    </main>
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

const MonthsNoSelect = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
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
};
