"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import { dictionaries, type Locale, type Dictionary } from "./dictionaries"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  // Initialize with the server default to ensure SSR output matches initial client render.
  // Detect browser/localStorage only after mount to avoid hydration mismatches.
  const [locale, setLocaleState] = useState<Locale>("fr")

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("link2mpx_locale")) as Locale | null
    if (saved && (saved === "fr" || saved === "en")) {
      setLocaleState(saved)
      return
    }
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.startsWith("fr") ? "fr" : "en"
      setLocaleState(browserLang)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem("link2mpx_locale", newLocale)
    }
  }, [])

  const t = dictionaries[locale]

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
