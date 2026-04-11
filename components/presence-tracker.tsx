"use client"

import { useEffect } from "react"
import { ref, onValue, onDisconnect, set, push, remove } from "firebase/database"
import { rtdb } from "@/lib/firebase/config"

export function PresenceTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return

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

    return () => {
      unsubConnected()
      // manually remove presence on unmount (rarely happens as this is in layout)
      remove(myPresenceRef).catch(() => {})
    }
  }, [])

  return null
}
