import { useTranslation } from "react-i18next";
import Header from "./components/header";
import { useEffect } from "react";
import { useParams } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CountrySelector from "./components/ui/countrySelector";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  const {
    i18n: { changeLanguage },
  } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && ["en", "ar"].includes(lang)) {
      changeLanguage(lang);
    }
  }, [lang, changeLanguage]);
  return (
    <QueryClientProvider client={queryClient}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        <Header />
        <main className="min-h-screen-header container">
          <CountrySelector />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
