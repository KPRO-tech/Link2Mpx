"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/context"
import { CookieBanner } from "@/components/cookie-banner"
import { HeartHandshake, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen flex flex-col relative bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 right-0 z-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 relative z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="glass-strong p-10 md:p-16 rounded-3xl border border-white/10 max-w-2xl text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
              <HeartHandshake className="w-12 h-12 text-green-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text"
          >
            {t.thankyou?.title}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-medium text-green-500 mb-6"
          >
            {t.thankyou?.subtitle}
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground leading-relaxed mb-10"
          >
            {t.thankyou?.message}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.thankyou?.backHome}
            </Link>
          </motion.div>

        </motion.div>

      </div>

      <CookieBanner />
    </main>
  )
}
