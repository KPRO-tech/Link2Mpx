"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { doc, getDoc } from "firebase/firestore"
import { User, Download, Calendar, LogOut, ArrowLeft, Clock } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/firebase/auth-context"
import { useI18n } from "@/lib/i18n/context"
import { useQuota } from "@/hooks/use-quota"
import { db } from "@/lib/firebase/config"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface UserData {
  email: string
  displayName: string
  createdAt: { seconds: number } | null
  totalDownloads: number
}

export default function ProfilePage() {
  const { t } = useI18n()
  const { user, loading: authLoading, logout } = useAuth()
  const { dailyDownloads, maxDownloads } = useQuota()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData)
          }
        } catch {
          // Silent fail
        }
      }
    }
    fetchUserData()
  }, [user])

  const handleLogout = async () => {
    await logout()
    toast.success(t.auth.logoutSuccess)
    router.push("/")
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  const quotaPercent = (dailyDownloads / maxDownloads) * 100
  const remaining = maxDownloads - dailyDownloads
  const quotaColor =
    remaining > 10 ? "bg-accent" : remaining > 5 ? "bg-primary" : "bg-destructive"

  const memberSince = userData?.createdAt
    ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString()
    : "N/A"

  // Calculate hours until midnight UTC
  const now = new Date()
  const midnight = new Date(now)
  midnight.setUTCHours(24, 0, 0, 0)
  const hoursUntilReset = Math.ceil(
    (midnight.getTime() - now.getTime()) / (1000 * 60 * 60)
  )

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <div className="flex-1 px-4 pt-28 pb-16">
        <div className="mx-auto max-w-xl">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-foreground mb-8">
              {t.profile.title}
            </h1>

            {/* User Info */}
            <div className="flex items-center gap-4 p-5 rounded-2xl glass mb-6">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {user.displayName || "User"}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Quota Card */}
            <div className="p-5 rounded-2xl glass mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Download className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  {t.profile.dailyQuota}
                </h3>
              </div>

              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  {dailyDownloads}/{maxDownloads} {t.download.quotaAuth}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {t.download.resetIn} {hoursUntilReset} {t.download.hours}
                </span>
              </div>

              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", quotaColor)}
                  initial={{ width: 0 }}
                  animate={{ width: `${quotaPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                {t.profile.resetNote}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl glass text-center">
                <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  {t.profile.memberSince}
                </p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {memberSince}
                </p>
              </div>
              <div className="p-4 rounded-2xl glass text-center">
                <Download className="h-5 w-5 text-accent mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  {t.profile.totalDownloads}
                </p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {userData?.totalDownloads || 0}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {t.profile.logout}
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  )
}
