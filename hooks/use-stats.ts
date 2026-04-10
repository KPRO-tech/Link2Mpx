"use client"

import { useState, useEffect } from "react"
import { ref, onValue, onDisconnect, set, push, remove } from "firebase/database"
import { rtdb } from "@/lib/firebase/config"

interface Stats {
  onlineUsers: number
  totalUsers: number
  totalDownloadsToday: number
  totalDownloads: number
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
    const connectedRef = ref(rtdb, ".info/connected")
    
    // Create a unique reference for this client's presence
    const myPresenceRef = push(presenceRef)

    const unsubConnected = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // When connected, set up the onDisconnect behavior
        onDisconnect(myPresenceRef).remove().then(() => {
           // Once onDisconnect is queued on the server, set presence to true
           set(myPresenceRef, true)
        })
      }
    })

    const handleStats = (snapshot: any) => {
      const data = snapshot.val() || {}
      setStats((prev) => ({
        ...prev,
        totalUsers: data.totalUsers || 0,
        totalDownloadsToday: data.totalDownloadsToday || 0,
        totalDownloads: data.totalDownloads || 0,
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
      unsubConnected()
      unsubStats()
      unsubPresence()
      // manually remove presence on unmount
      remove(myPresenceRef).catch(()=> {})
    }
  }, [])

  return { stats, loading }
}
