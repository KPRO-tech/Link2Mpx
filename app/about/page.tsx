"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  LinkIcon,
  Settings2,
  Download,
  ArrowRight,
  Check,
  ExternalLink,
  Infinity,
  Rocket,
  Eye,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { CookieBanner } from "@/components/cookie-banner"
import { useI18n } from "@/lib/i18n/context"
import { useState } from "react"

export default function AboutPage() {
  const { t } = useI18n()
  const [authOpen, setAuthOpen] = useState(false)
  const kproUrl =
    process.env.NEXT_PUBLIC_KPRO_WEBSITE_URL || "https://kprotech.vercel.app"

  const steps = [
    {
      icon: LinkIcon,
      number: "01",
      title: t.about.step1Title,
      desc: t.about.step1Desc,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      icon: Settings2,
      number: "02",
      title: t.about.step2Title,
      desc: t.about.step2Desc,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20",
    },
    {
      icon: Download,
      number: "03",
      title: t.about.step3Title,
      desc: t.about.step3Desc,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
  ]

  const freeFeatures = [
    t.about.freeF1,
    t.about.freeF2,
    t.about.freeF3,
    t.about.freeF4,
    t.about.freeF5,
    t.about.freeF6,
  ]

  const openFeatures = [
    t.about.openF1,
    t.about.openF2,
    t.about.openF3,
    t.about.openF4,
    t.about.openF5,
    t.about.openF6,
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <main className="pt-24">
        {/* Hero / Description */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-6">
                <Rocket className="h-4 w-4 text-primary" />
                {t.about.subtitle}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {t.about.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-base">
                {t.about.description}
              </p>
            </motion.div>

            <motion.div
              className="mt-12 p-6 rounded-2xl glass text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-accent/10">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {t.about.vision}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t.about.visionText}
              </p>
            </motion.div>
          </div>
        </section>

        {/* How it works - 3 steps */}
        <section className="px-4 py-16 bg-card/30">
          <div className="mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">
                {t.about.howTitle}
              </h2>
              <p className="text-muted-foreground text-sm">
                {t.about.howSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className={`relative flex flex-col items-center text-center p-8 rounded-2xl glass border ${step.border}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <span
                    className={`text-5xl font-black ${step.color} opacity-20 absolute top-3 right-4`}
                  >
                    {step.number}
                  </span>
                  <div className={`p-4 rounded-2xl ${step.bg} mb-4`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* KPRO.tech section */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground text-balance">
                {t.about.kproTitle}
              </h2>
            </motion.div>

            <motion.div
              className="rounded-2xl overflow-hidden border border-[#1e3a8a]/30"
              style={{
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
                <div className="flex-shrink-0">
                  <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-[#3b82f6]/40 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <Image
                      src="/logokpt.png"
                      alt="KPRO.tech"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <a
                    href={kproUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 group"
                  >
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                      <span>K</span>
                      <span className="text-white">PRO</span>
                      <span>.tech</span>
                    </h3>
                    <ExternalLink className="h-4 w-4 text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className="text-[#3b82f6]/80 text-sm font-medium italic mt-1">
                    {t.about.kproTagline}
                  </p>
                  <p className="text-slate-300/80 text-sm leading-relaxed mt-3">
                    {t.about.kproDesc}
                  </p>
                  <a
                    href={kproUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-lg bg-[#3b82f6] text-white text-sm font-medium hover:bg-[#2563eb] transition-colors"
                  >
                    {t.about.kproVisit}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 py-16 bg-card/30">
          <div className="mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">
                {t.about.pricingTitle}
              </h2>
              <p className="text-muted-foreground text-sm">
                {t.about.pricingSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free card */}
              <motion.div
                className="relative flex flex-col rounded-2xl glass border border-primary/20 overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {t.about.freeTitle}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {t.about.freeDesc}
                  </p>

                  <ul className="flex flex-col gap-3">
                    {freeFeatures.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-3 text-sm text-foreground/80"
                      >
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    {t.about.freeCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Open Source card */}
              <motion.div
                className="relative flex flex-col rounded-2xl glass border border-accent/20 overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary" />
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {t.about.openTitle}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {t.about.openDesc}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {openFeatures.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-3 text-sm text-foreground/80"
                      >
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  <a
                    href="https://github.com/KPRO-tech/Link2Mpx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
                  >
                    {t.about.openCta}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  )
}
