import { createContext, useCallback, useMemo, useState } from "react";
import type { Locale, Translations } from "./types.js";
import { en } from "./en.js";
import { es } from "./es.js";

const LOCALES: Record<Locale, Translations> = { en, es };
const STORAGE_KEY = "portfolio-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "es" ? "es" : "en";
}

export interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps): React.JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale): void => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: LOCALES[locale], setLocale }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
