"use client"

import { useState, useEffect } from "react"
import { ref, onValue, runTransaction } from "firebase/database"
import { rtdb } from "@/lib/firebase/config"

interface Stats {
  onlineUsers: number
  totalUsers: number
  totalDownloadsToday: number
  totalDownloads: number
  lastResetDate?: string
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    onlineUsers: 0,
    totalUsers: 0,
    totalDownloadsToday: 0,
    totalDownloads: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const statsRef = ref(rtdb, "stats")
    const presenceRef = ref(rtdb, "presence")

    const handleStats = (snapshot: any) => {
      const data = snapshot.val() || {}
      const today = new Date().toISOString().split("T")[0]

      // Check if we need to reset the daily counter
      if (data.lastResetDate !== today) {
        const statsRef = ref(rtdb, "stats")
        runTransaction(statsRef, (currentData) => {
          if (currentData && currentData.lastResetDate !== today) {
            return {
              ...currentData,
              totalDownloadsToday: 0,
              lastResetDate: today,
            }
          }
          return currentData
        })
      }

      setStats((prev) => ({
        ...prev,
        totalUsers: data.totalUsers || 0,
        totalDownloadsToday: data.totalDownloadsToday || 0,
        totalDownloads: data.totalDownloads || 0,
        lastResetDate: data.lastResetDate,
      }))
    }

    const handlePresence = (snapshot: any) => {
      // Count keys in presence to get online users
      const count = snapshot.size || (snapshot.val() ? Object.keys(snapshot.val()).length : 0)
      setStats((prev) => ({
        ...prev,
        onlineUsers: Math.max(1, count), 
      }))
      setLoading(false)
    }

    const handleError = (error: Error) => {
      console.error("Error fetching stats or presence:", error)
      setLoading(false)
    }

    const unsubStats = onValue(statsRef, handleStats, handleError)
    const unsubPresence = onValue(presenceRef, handlePresence, handleError)

    return () => {
      unsubStats()
      unsubPresence()
    }
  }, [])

  return { stats, loading }
}
