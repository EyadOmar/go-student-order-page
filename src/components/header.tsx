import LocaleSwitch from "./ui/localeSwitch";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="h-header container flex items-center justify-end">
        <LocaleSwitch />
      </div>
    </header>
  );
}
