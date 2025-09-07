import { Link } from "react-router";
import LocaleSwitch from "./ui/localeSwitch";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="h-header container flex items-center justify-end">
        <Link
          to={"/some-page-that-does-not-exist-yet"}
          className="hover:text-secondary group relative me-2 block text-sm font-bold transition-discrete duration-200 ease-in-out lg:text-base"
        >
          All Advantages
          <span className="bg-secondary absolute start-0 bottom-0 h-px w-0 group-hover:w-full group-hover:duration-200 group-hover:ease-in-out"></span>
        </Link>
        <LocaleSwitch />
      </div>
    </header>
  );
}
