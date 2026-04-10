"use client"

import { useState, type ReactNode } from "react"
import { ArrowLeft, Calendar, RefreshCw, FileText } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { CookieBanner } from "@/components/cookie-banner"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

interface LegalLayoutProps {
  title: string
  effectiveDate: string
  lastUpdated?: string
  currentPage: "terms" | "privacy" | "legal-notice" | "faq"
  children: ReactNode
}

const legalPages = {
  fr: [
    { key: "terms", label: "Conditions Generales d'Utilisation", href: "/terms" },
    { key: "privacy", label: "Politique de Confidentialite", href: "/privacy" },
    { key: "legal-notice", label: "Avertissement Legal", href: "/legal-notice" },
    { key: "faq", label: "Questions Frequentes", href: "/faq" },
  ],
  en: [
    { key: "terms", label: "Terms of Service", href: "/terms" },
    { key: "privacy", label: "Privacy Policy", href: "/privacy" },
    { key: "legal-notice", label: "Legal Notice", href: "/legal-notice" },
    { key: "faq", label: "Frequently Asked Questions", href: "/faq" },
  ],
}

export function LegalLayout({ title, effectiveDate, lastUpdated, currentPage, children }: LegalLayoutProps) {
  const { t, locale } = useI18n()
  const [authOpen, setAuthOpen] = useState(false)

  const pages = legalPages[locale]
  const otherPages = pages.filter((p) => p.key !== currentPage)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <div className="flex-1 px-4 pt-28 pb-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>

          {/* Dates at the top */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {locale === "fr" ? "Date d'entree en vigueur" : "Effective date"}: <span className="text-foreground font-medium">{effectiveDate}</span>
            </span>
            {lastUpdated && (
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" />
                {locale === "fr" ? "Derniere mise a jour" : "Last updated"}: <span className="text-foreground font-medium">{lastUpdated}</span>
              </span>
            )}
          </div>

          {/* Cross-navigation links */}
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border/50">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 mr-1">
              <FileText className="h-3.5 w-3.5" />
              {locale === "fr" ? "Voir aussi :" : "See also:"}
            </span>
            {otherPages.map((page, i) => (
              <Link
                key={page.key}
                href={page.href}
                className="text-xs text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
              >
                {page.label}
              </Link>
            ))}
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="flex flex-col gap-6 text-muted-foreground text-sm leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CookieBanner />
    </main>
  )
}
