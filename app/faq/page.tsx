"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Calendar, RefreshCw, FileText, Instagram } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { CookieBanner } from "@/components/cookie-banner"
import { useI18n } from "@/lib/i18n/context"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-5 text-left hover:bg-secondary/30 transition-colors"
      >
        <span className="font-medium text-foreground text-sm pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border/30 pt-4">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const { locale, t } = useI18n()
  const [authOpen, setAuthOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const items = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
    { q: t.faq.q8, a: t.faq.a8 },
    { q: t.faq.q9, a: t.faq.a9 },
    { q: t.faq.q10, a: t.faq.a10 },
    { q: t.faq.q11, a: t.faq.a11 },
  ]

  const categories = [
    {
      title: locale === "fr" ? "Questions Generales" : "General Questions",
      items: items.slice(0, 2),
      startIdx: 0,
    },
    {
      title: locale === "fr" ? "Utilisation du Service" : "Using the Service",
      items: items.slice(2, 6),
      startIdx: 2,
    },
    {
      title: locale === "fr" ? "Questions Legales & Securite" : "Legal & Security",
      items: items.slice(6, 10),
      startIdx: 6,
    },
    {
      title: locale === "fr" ? "Compte & Contribution" : "Account & Contributing",
      items: items.slice(10, 11),
      startIdx: 10,
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <div className="flex-1 px-4 pt-28 pb-16">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">
            {t.faq.title}
          </h1>

          <div className="flex flex-wrap gap-2 pb-6 border-b border-border/50">
          </div>
          <Image
            src="/Link2Mpx-removebg-preview.png"
            alt="Link2Mpx"
            width={230}
            height={230}
            className="justify-center mx-auto"
          />
          <p className="text-muted-foreground mb-10 text-2sm text-center">
            {t.faq.subtitle}
          </p>

          {categories.map((cat) => (
            <div key={cat.title} className="mb-8">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
                {cat.title}
              </h2>
              <div className="flex flex-col gap-3">
                {cat.items.map((item, i) => {
                  const globalIdx = cat.startIdx + i
                  return (
                    <AccordionItem
                      key={item.q}
                      question={item.q}
                      answer={item.a}
                      isOpen={openIndex === globalIdx}
                      onToggle={() =>
                        setOpenIndex(openIndex === globalIdx ? null : globalIdx)
                      }
                    />
                  )
                })}
              </div>
            </div>
          ))}

          <div className="mt-10 text-center p-6 rounded-xl border border-border/50 bg-card/50">
            <p className="text-sm text-muted-foreground">
              {locale === "fr"
                ? "Vous n'avez pas trouve la reponse a votre question ?"
                : "Didn't find the answer to your question?"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "fr" ? (
                <a
                  href="https://instagram.com/kpro.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline hover:text-foreground transition-colors"
                >
                  <span>Contactez-nous via @KPRO.tech</span>
                  <Instagram className="h-4 w-4" />
                </a>

              ) : (
                <a
                  href="https://instagram.com/kpro.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline hover:text-foreground transition-colors"
                >
                  <span>Contact us via @KPRO.tech</span>
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-3 font-semibold">
              BY KPRO.tech - Link2Mpx
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CookieBanner />
    </main>
  )
}
