import { useTranslation } from "react-i18next";
import Header from "./components/header";
import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./components/pages/not-found/not-found";
import Home from "./components/pages/home/home";
import { Toaster } from "./components/ui/sonner";

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
  const isLangSupported = lang && ["en", "ar"].includes(lang);

  useEffect(() => {
    if (isLangSupported) {
      changeLanguage(lang);
    }
  }, [isLangSupported, changeLanguage, lang]);
  return (
    <QueryClientProvider client={queryClient}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        <Header />
        {isLangSupported ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <NotFound />
        )}
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
