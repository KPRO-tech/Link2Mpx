"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { ref, set, onDisconnect, serverTimestamp as rtdbTimestamp, runTransaction } from "firebase/database"
import { auth, db, rtdb } from "./config"

interface AuthContextType {
  user: User | null
  loading: boolean
  loginWithEmail: (email: string, password: string) => Promise<void>
  registerWithEmail: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const registerWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    await updateProfile(credential.user, { displayName })
    // Create Firestore user doc
    await setDoc(doc(db, "users", credential.user.uid), {
      email,
      displayName,
      createdAt: serverTimestamp(),
      dailyDownloads: 0,
      lastResetDate: new Date().toISOString().split("T")[0],
      totalDownloads: 0,
    })

    // Increment global user count
    const statsRef = ref(rtdb, "stats/totalUsers")
    runTransaction(statsRef, (currentValue) => {
      return (currentValue || 0) + 1
    })
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    // Check if user doc exists, create if not
    const userDoc = await getDoc(doc(db, "users", credential.user.uid))
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", credential.user.uid), {
        email: credential.user.email,
        displayName: credential.user.displayName,
        createdAt: serverTimestamp(),
        dailyDownloads: 0,
        lastResetDate: new Date().toISOString().split("T")[0],
        totalDownloads: 0,
      })

      // Increment global user count
      const statsRef = ref(rtdb, "stats/totalUsers")
      runTransaction(statsRef, (currentValue) => {
        return (currentValue || 0) + 1
      })
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
