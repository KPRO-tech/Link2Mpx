"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useI18n } from "@/lib/i18n/context"
import { useAuth } from "@/lib/firebase/auth-context"
import Link from "next/link"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useI18n()
  const { loginWithEmail, registerWithEmail, loginWithGoogle, resetPassword } =
    useAuth()
  const [mode, setMode] = useState<"login" | "register" | "reset">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setDisplayName("")
    setAcceptTerms(false)
    setShowPassword(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === "reset") {
        await resetPassword(email)
        toast.success(t.auth.resetSent)
        setMode("login")
        resetForm()
      } else if (mode === "login") {
        await loginWithEmail(email, password)
        toast.success(t.auth.loginSuccess)
        onClose()
        resetForm()
      } else {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match")
          setLoading(false)
          return
        }
        if (!acceptTerms) {
          toast.error("Please accept the terms")
          setLoading(false)
          return
        }
        await registerWithEmail(email, password, displayName)
        toast.success(t.auth.registerSuccess)
        onClose()
        resetForm()
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred"
      )
    }

    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      toast.success(t.auth.loginSuccess)
      onClose()
      resetForm()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred"
      )
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-md rounded-2xl glass-strong shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">
              {mode === "reset"
                ? t.auth.forgotPassword
                : mode === "login"
                  ? t.auth.login
                  : t.auth.register}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-secondary/50 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-5 flex flex-col gap-4">
            {/* Google */}
            {mode !== "reset" && (
              <>
                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 w-full py-2.5 rounded-xl border border-border hover:bg-secondary/50 text-foreground text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  {t.auth.continueGoogle}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">
                    {t.auth.or}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {mode === "register" && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t.auth.name}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.email}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                  required
                />
              </div>

              {mode !== "reset" && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.auth.password}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              )}

              {mode === "register" && (
                <>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t.auth.confirmPassword}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                      required
                      minLength={6}
                    />
                  </div>

                  <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 rounded border-border accent-primary"
                    />
                    <span>
                      {t.auth.termsAgree}{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                        target="_blank"
                      >
                        {t.auth.terms}
                      </Link>{" "}
                      {t.auth.and}{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                        target="_blank"
                      >
                        {t.auth.privacy}
                      </Link>
                    </span>
                  </label>
                </>
              )}

              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("reset")
                    resetForm()
                  }}
                  className="text-xs text-primary hover:underline text-right"
                >
                  {t.auth.forgotPassword}
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "reset"
                  ? t.auth.forgotPassword
                  : mode === "login"
                    ? t.auth.signIn
                    : t.auth.signUp}
              </button>
            </form>

            {/* Toggle mode */}
            <div className="text-center text-xs text-muted-foreground">
              {mode === "login" ? (
                <>
                  {t.auth.noAccount}{" "}
                  <button
                    onClick={() => {
                      setMode("register")
                      resetForm()
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    {t.auth.signUp}
                  </button>
                </>
              ) : mode === "register" ? (
                <>
                  {t.auth.hasAccount}{" "}
                  <button
                    onClick={() => {
                      setMode("login")
                      resetForm()
                    }}
                    className="text-primary hover:underline font-medium"
                  >
                    {t.auth.signIn}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMode("login")
                    resetForm()
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  {t.auth.signIn}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
