"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { CookieBanner } from "@/components/cookie-banner"
import { Heart, Server, Code, Ban, ExternalLink, ShieldCheck } from "lucide-react"

export default function DonatePage() {
  const { t } = useI18n()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <main className="min-h-screen flex flex-col relative bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 z-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none opacity-40 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 z-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none opacity-30 mix-blend-screen" />

      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-32 pb-24 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Heart className="w-10 h-10 text-green-500" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 gradient-text">
            {t.donate?.title || "Support Link2Mpx"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t.donate?.subtitle || "Your donation helps us keep this service 100% free, fast, and ad-free."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-strong p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.donate?.reason1Title}</h3>
            <p className="text-muted-foreground">{t.donate?.reason1Desc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-strong p-8 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.donate?.reason2Title}</h3>
            <p className="text-muted-foreground">{t.donate?.reason2Desc}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-strong p-8 rounded-2xl border border-white/5 hover:border-green-500/20 transition-colors"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
              <Ban className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t.donate?.reason3Title}</h3>
            <p className="text-muted-foreground">{t.donate?.reason3Desc}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-2xl bg-gradient-to-br from-primary/10 to-transparent p-1 rounded-3xl"
        >
          <div className="bg-background/80 backdrop-blur-xl rounded-[23px] p-8 md:p-12 text-center border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.donate?.impactTitle}</h2>
            <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              {t.donate?.impactDesc}
            </p>

            <a
              href="https://paystack.shop/pay/link2mpx-donation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)]"
            >
              {t.donate?.donateBtn}
              <ExternalLink className="w-5 h-5" />
            </a>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              {t.donate?.securePayment}
            </div>
          </div>
        </motion.div>

      </div>

      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CookieBanner />
    </main>
  )
}
