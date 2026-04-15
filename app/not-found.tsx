"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Link2Off, Home, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { useI18n } from "@/lib/i18n/context"

export default function NotFound() {
  const { t } = useI18n()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative inline-block"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

            {/* Icon */}
            <div className="relative glass-strong p-8 rounded-3xl border border-border/50 glow-orange inline-flex">
              <Link2Off className="h-16 w-16 text-primary" strokeWidth={1.5} />
            </div>
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-7xl font-black gradient-text tracking-tighter"
            >
              {t.notFound.subtitle}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold text-foreground"
            >
              {t.notFound.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-balanced leading-relaxed"
            >
              {t.notFound.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              <Home className="h-4 w-4" />
              {t.notFound.backHome}
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-secondary/50 transition-all active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.common.back}
            </button>
          </motion.div>
        </div>
      </main>

      {/* <Footer /> */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}
