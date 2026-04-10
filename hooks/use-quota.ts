"use client"

import { useState, useEffect, useCallback } from "react"
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"
import { ref, runTransaction } from "firebase/database"
import { db, rtdb } from "@/lib/firebase/config"
import { useAuth } from "@/lib/firebase/auth-context"

const ANON_MAX = 5 //max download for anonymous users
const AUTH_MAX = 20 //max download for authenticated users
const STORAGE_KEY = "link2mpx_anonymous_quota"

interface AnonQuota {
  count: number
  date: string
  downloads: string[]
}

export function useQuota() {
  const { user } = useAuth()
  const [dailyDownloads, setDailyDownloads] = useState(0)
  const [loading, setLoading] = useState(true)

  const maxDownloads = user ? AUTH_MAX : ANON_MAX

  const getAnonQuota = useCallback((): AnonQuota => {
    if (typeof window === "undefined")
      return { count: 0, date: "", downloads: [] }
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return { count: 0, date: "", downloads: [] }
      const parsed: AnonQuota = JSON.parse(stored)
      const today = new Date().toISOString().split("T")[0]
      if (parsed.date !== today) {
        return { count: 0, date: today, downloads: [] }
      }
      return parsed
    } catch {
      return { count: 0, date: "", downloads: [] }
    }
  }, [])

  const fetchQuota = useCallback(async () => {
    setLoading(true)
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const data = userDoc.data()
        const today = new Date().toISOString().split("T")[0]
        if (data?.lastResetDate !== today) {
          await updateDoc(doc(db, "users", user.uid), {
            dailyDownloads: 0,
            lastResetDate: today,
          })
          setDailyDownloads(0)
        } else {
          setDailyDownloads(data?.dailyDownloads || 0)
        }
      } catch {
        setDailyDownloads(0)
      }
    } else {
      const quota = getAnonQuota()
      setDailyDownloads(quota.count)
    }
    setLoading(false)
  }, [user, getAnonQuota])

  useEffect(() => {
    fetchQuota()
  }, [fetchQuota])

  const canDownload = dailyDownloads < maxDownloads

  const incrementQuota = useCallback(
    async (downloadId?: string) => {
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          dailyDownloads: increment(1),
          totalDownloads: increment(1),
        })
        setDailyDownloads((prev) => prev + 1)
      } else {
        const quota = getAnonQuota()
        const today = new Date().toISOString().split("T")[0]
        const newQuota: AnonQuota = {
          count: quota.count + 1,
          date: today,
          downloads: [...quota.downloads, downloadId || Date.now().toString()],
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuota))
        setDailyDownloads(newQuota.count)
      }

      // Increment global stats
      const totalDownloadsRef = ref(rtdb, "stats/totalDownloads")
      const todayDownloadsRef = ref(rtdb, "stats/totalDownloadsToday")

      runTransaction(totalDownloadsRef, (current) => (current || 0) + 1)
      runTransaction(todayDownloadsRef, (current) => (current || 0) + 1)
    },
    [user, getAnonQuota]
  )

  const remaining = maxDownloads - dailyDownloads

  return {
    dailyDownloads,
    maxDownloads,
    remaining,
    canDownload,
    incrementQuota,
    loading,
    refreshQuota: fetchQuota,
  }
}
