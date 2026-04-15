"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Globe,
  ChevronDown,
  Github,
} from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { useAuth } from "@/lib/firebase/auth-context"
import { cn } from "@/lib/utils"

interface NavbarProps {
  onOpenAuth: () => void
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const { locale, setLocale, t } = useI18n()
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "top-3 left-4 right-4 mx-auto max-w-5xl rounded-2xl glass-strong glow-orange shadow-lg"
          : "w-full glass"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Link2Mpx_de-face_-removebg-preview.png"
            alt="Link2Mpx"
            width={40}
            height={40}
            className="h-9 w-auto"
          />
          <span className="text-lg font-bold gradient-text hidden sm:inline">
            Link2Mpx
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.about}
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.faq}
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* GitHub Link */}
          <a
            href={process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/KPRO-tech/Link2Mpx"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors hidden sm:block"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </a>

          {/* Language Toggle */}
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label={t.nav.language}
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase text-xs">{locale}</span>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Auth / User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {user.displayName?.charAt(0)?.toUpperCase() ||
                    user.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </div>
                <ChevronDown className="h-3 w-3 text-foreground/60" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl glass-strong p-1 shadow-xl"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      {t.nav.profile}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t.nav.logout}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t.nav.login}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="flex flex-col gap-1 p-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {t.nav.about}
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {t.nav.faq}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
