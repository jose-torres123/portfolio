import { useI18n } from "@/lib/i18n/index.js";
import type { Locale } from "@/lib/i18n/index.js";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

export function LanguageSwitcher(): React.JSX.Element {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border/50 p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l.value}
          type="button"
          onClick={() => setLocale(l.value)}
          className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
            locale === l.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`Switch to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
