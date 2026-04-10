"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import Link from "next/link"

const COOKIE_KEY = "link2mpx_cookies_consent"

export function CookieBanner() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-3 p-4 rounded-2xl glass-strong shadow-lg">
            <div className="flex items-start gap-3">
              <Cookie className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground">
                  {t.cookies.message}
                </p>
                <Link
                  href="/privacy"
                  className="text-xs text-primary hover:underline mt-1 inline-block"
                >
                  {t.cookies.learnMore}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={handleDecline}
                className="px-4 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {t.cookies.decline}
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {t.cookies.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
