"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link2, Search, AlertTriangle, LightbulbIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import Link from "next/link"

// Platform icons as simple SVG components
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

interface HeroSectionProps {
  onAnalyze: (urls: string[], format: "mp4" | "mp3") => void
  isAnalyzing: boolean
}

export function HeroSection({ onAnalyze, isAnalyzing }: HeroSectionProps) {
  const [urlText, setUrlText] = useState("")
  const [format, setFormat] = useState<"mp4" | "mp3">("mp4")
  const { t } = useI18n()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlText.trim()) {
      const urls = urlText
        .split(/[\s,]+/)
        .filter((u) => u.startsWith("http"))
      if (urls.length > 0) {
        onAnalyze(urls, format)
      } else {
        onAnalyze([urlText.trim()], format) // fallback if just a plain string without http
      }
    }
  }

  const platforms = [
    { icon: TikTokIcon, name: "TikTok" },
    { icon: InstagramIcon, name: "Instagram" },
    { icon: TwitterIcon, name: "X" },
    { icon: FacebookIcon, name: "Facebook" },
  ]

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 pt-28 pb-12">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Title */}
        <div className="flex flex-col items-center gap-3">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight gradient-text text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl font-medium text-foreground/80 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.p
            className="text-sm sm:text-base text-muted-foreground max-w-xl text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {t.hero.description}
          </motion.p>
        </div>

        {/* URL Input */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative flex flex-col gap-3 p-4 rounded-3xl glass-strong glow-orange">
            <div className="flex bg-background/50 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setFormat("mp4")}
                className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${format === 'mp4' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-foreground/5 text-muted-foreground'}`}
              >
                MP4
              </button>
              <button
                type="button"
                onClick={() => setFormat("mp3")}
                className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${format === 'mp3' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-foreground/5 text-muted-foreground'}`}
              >
                MP3
              </button>
            </div>

            <div className="flex flex-col bg-background/30 rounded-2xl border border-foreground/5 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <div className="flex items-start gap-2 p-2">
                <div className="flex pt-3 pl-3">
                  <Link2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <textarea
                  value={urlText}
                  onChange={(e) => setUrlText(e.target.value)}
                  placeholder={t.hero.placeholder}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base px-2 py-3 outline-none resize-none min-h-[100px]"
                  disabled={isAnalyzing}
                />
              </div>
              <div className="w-full bg-background/50 text-xs text-muted-foreground text-left px-4 py-2 border-t border-foreground/5 flex items-center gap-2">
                <span><LightbulbIcon className="h-4 w-4" /></span>
                <span>{t.hero.helper}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!urlText.trim() || isAnalyzing}
              className="w-full sm:w-auto self-end flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm sm:text-base hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <Search className="h-4 w-4" />
              {isAnalyzing ? t.download.analyzing : t.hero.analyze}
            </button>
          </div>
        </motion.form>

        {/* Platforms */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <span className="text-xs text-muted-foreground">
            {t.hero.topPlatforms}
          </span>
          <div className="flex items-center gap-4">
            {platforms.map((p) => (
              <p.icon
                key={p.name}
                className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Warning */}
      <motion.div
        className="relative z-10 mt-10 w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5">
          <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {t.warning.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t.warning.message}{" "}
              <Link
                href="/legal-notice"
                className="text-primary hover:underline"
              >
                {t.warning.learnMore}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
