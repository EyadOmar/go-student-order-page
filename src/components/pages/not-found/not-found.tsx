import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function NotFound() {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <main className="min-h-screen-header container flex flex-col items-center justify-center gap-5 lg:gap-10">
      <h1 className="text-3xl font-bold lg:text-7xl">404 - Page Not Found</h1>
      <Link
        to={"/" + language}
        className="bg-primary text-primary-foreground inline-flex h-12 items-center justify-center rounded-sm px-4 py-2 font-medium"
      >
        Return to Home
      </Link>
    </main>
  );
}
