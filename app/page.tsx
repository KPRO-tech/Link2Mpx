"use client"

import { useState } from "react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { toast } from "sonner"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { AuthModal } from "@/components/auth-modal"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { analyzeAndDownload } from "@/lib/api/downloader"
import { useI18n } from "@/lib/i18n/context"
import { DownloadQueue, type QueueItem } from "@/components/download-queue"
import { useQuota } from "@/hooks/use-quota"
import { useAuth } from "@/lib/firebase/auth-context"

export default function HomePage() {
  const { t } = useI18n()
  const [authOpen, setAuthOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [queue, setQueue] = useState<QueueItem[]>([])
  
  const { user } = useAuth()
  const { canDownload, incrementQuota } = useQuota()

  const handleAnalyze = async (urls: string[], format: "mp4"|"mp3") => {
    // filter empty
    const validUrls = urls.filter(u => u.trim().length > 0)
    if(validUrls.length === 0) return

    setIsAnalyzing(true)
    
    // Add to queue
    const newItems: QueueItem[] = validUrls.map(url => ({
      id: Math.random().toString(36).substr(2, 9) + Date.now(),
      url,
      format,
      status: "pending"
    }))
    
    setQueue(prev => [...newItems, ...prev])

    // Process each asynchronously but in order
    for (const item of newItems) {
      // Check Youtube
      const urlLower = item.url.toLowerCase()
      if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
         // TypeScript doesn't know about the new youtubeBlocked key deeply for everyone unless defined, let's cast or fallback safely
         const warningText = (t.warning as any).youtubeBlocked || "YouTube downloading is disabled."
         toast.error(warningText)
         setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "error", errorMsg: "YouTube non supporté" } : q))
         continue
      }
      
      // Check quota
      if (!canDownload) {
         toast.error(t.download.quotaExhausted)
         
         const pendingIds = newItems.slice(newItems.indexOf(item)).map(i => i.id);
         setQueue(prev => prev.map(q => pendingIds.includes(q.id) ? { ...q, status: "error", errorMsg: "Quota épuisé" } : q))
         
         if (!user) {
           setAuthOpen(true)
         }
         break // break the loop, no point processing more if quota is zero
      }

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "processing" } : q))
      
      const result = await analyzeAndDownload(item.url, item.format)
      
      if (result.success && result.downloadUrl) {
         setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "ready", downloadUrl: result.downloadUrl } : q))
         // Increment quota for success
         await incrementQuota(item.id)
      } else {
         setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "error", errorMsg: result.error } : q))
         toast.error(result.error)
      }
    }

    setIsAnalyzing(false)
  }

  const handleDownloadFile = (downloadUrl: string, filename: string) => {
    const a = document.createElement('a')
    a.href = downloadUrl
    a.target = '_blank'
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleDownloadAll = async () => {
    const readyItems = queue.filter(q => q.status === "ready" && q.downloadUrl)
    if (readyItems.length === 0) return

    const toastId = toast.loading("Préparation de l'archive ZIP...")
    try {
      const zip = new JSZip()
      const folder = zip.folder("Cooked_By_L2M")
      
      const promises = readyItems.map(async (item) => {
        try {
          const response = await fetch(item.downloadUrl!)
          if (!response.ok) throw new Error("Network error")
          const blob = await response.blob()
          const fileName = item.customName ? `${item.customName}.${item.format}` : `video_${item.id}.${item.format}`
          folder?.file(fileName, blob)
        } catch (error) {
          console.error("Fetch error:", error)
        }
      })
      
      await Promise.all(promises)
      
      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, "Cooked_By_L2M.zip")
      toast.success("Archive téléchargée !", { id: toastId })
    } catch (error) {
      toast.error("Erreur lors de la création du ZIP", { id: toastId })
    }
  }

  const handleRemove = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id))
  }

  const handleRename = (id: string, newName: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, customName: newName } : q))
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />

      <HeroSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      
      <div className="-mt-12 mb-20 relative z-20">
        <DownloadQueue 
           items={queue} 
           onDownload={handleDownloadFile} 
           onDownloadAll={handleDownloadAll} 
           onRemove={handleRemove} 
           onRename={handleRename}
        />
      </div>

      <StatsSection />
      <FeaturesSection />

      <Footer />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CookieBanner />
    </main>
  )
}
