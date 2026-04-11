"use client"

import { useState } from "react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { toast } from "sonner"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { AuthModal } from "@/components/auth-modal"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { ytdlpDownload } from "@/lib/api/ytdlp"
import { useI18n } from "@/lib/i18n/context"
import { DownloadQueue, type QueueItem } from "@/components/download-queue"
import { useQuota } from "@/hooks/use-quota"
import { useAuth } from "@/lib/firebase/auth-context"
import { HeroSection } from "@/components/hero-section"
import { ZipProgressModal } from "@/components/zip-progress-modal"
import { Navbar } from "@/components/navbar"

interface ZipFileProgress {
  name: string
  status: "pending" | "downloading" | "done" | "error"
  size?: number
}

export default function YtdlpTestPage() {
  const { t } = useI18n()
  const [authOpen, setAuthOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [queue, setQueue] = useState<QueueItem[]>([])

  // ZIP progress state
  const [zipOpen, setZipOpen] = useState(false)
  const [zipFiles, setZipFiles] = useState<ZipFileProgress[]>([])
  const [zipIndex, setZipIndex] = useState(0)
  const [zipTotalSize, setZipTotalSize] = useState(0)
  const [zipPhase, setZipPhase] = useState<"fetching" | "compressing" | "done" | "error">("fetching")
  const [zipError, setZipError] = useState<string | undefined>()

  const { user } = useAuth()
  const { canDownload, incrementQuota } = useQuota()

  const handleAnalyze = async (urls: string[], format: "mp4" | "mp3") => {
    const validUrls = urls.filter(u => u.trim().length > 0)
    if (validUrls.length === 0) return

    setIsAnalyzing(true)

    const newItems: QueueItem[] = validUrls.map(url => ({
      id: Math.random().toString(36).substr(2, 9) + Date.now(),
      url,
      format,
      status: "pending"
    }))

    setQueue(prev => [...newItems, ...prev])

    for (const item of newItems) {
      // Check Youtube
      const urlLower = item.url.toLowerCase()
      if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
         const warningText = (t.warning as any).youtubeBlocked || "YouTube downloading is disabled."
         toast.error(warningText, { duration: 6000 })
         setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "error", errorMsg: "YouTube \u274c" } : q))
         continue
      }

      if (!canDownload) {
        toast.error(t.download.quotaExhausted)
        const pendingIds = newItems.slice(newItems.indexOf(item)).map(i => i.id)
        setQueue(prev => prev.map(q => pendingIds.includes(q.id) ? { ...q, status: "error", errorMsg: t.download.quotaExhausted } : q))
        if (!user) {
          setAuthOpen(true)
        }
        break
      }

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "processing" } : q))

      const result = await ytdlpDownload(item.url, item.format)

      if (result.success && result.downloadUrl) {
        setQueue(prev => prev.map(q => q.id === item.id ? {
          ...q,
          status: "ready",
          downloadUrl: result.downloadUrl,
          customName: result.title || undefined
        } : q))
        await incrementQuota(item.id)
      } else {
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "error", errorMsg: result.error } : q))
        toast.error(result.error || t.download.error)
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

    // Init ZIP progress modal
    const filesList: ZipFileProgress[] = readyItems.map(item => ({
      name: item.customName
        ? `${item.customName}.${item.format}`
        : `video_${item.id}.${item.format}`,
      status: "pending"
    }))
    setZipFiles(filesList)
    setZipIndex(0)
    setZipTotalSize(0)
    setZipPhase("fetching")
    setZipError(undefined)
    setZipOpen(true)

    try {
      const zip = new JSZip()
      const folder = zip.folder("Cooked_By_L2M")
      let totalSize = 0

      // Download files sequentially for progress tracking
      for (let i = 0; i < readyItems.length; i++) {
        const item = readyItems[i]
        const fileName = filesList[i].name

        setZipIndex(i)
        setZipFiles(prev => prev.map((f, idx) =>
          idx === i ? { ...f, status: "downloading" } : f
        ))

        try {
          // Use the proxy route to avoid CORS issues
          const proxyUrl = `/api/ytdlp/proxy?url=${encodeURIComponent(item.downloadUrl!)}`
          const response = await fetch(proxyUrl)

          if (!response.ok) throw new Error(`HTTP ${response.status}`)

          const blob = await response.blob()
          folder?.file(fileName, blob)
          totalSize += blob.size

          setZipTotalSize(totalSize)
          setZipFiles(prev => prev.map((f, idx) =>
            idx === i ? { ...f, status: "done", size: blob.size } : f
          ))
        } catch (error) {
          console.error(`Erreur fetch ${fileName}:`, error)
          setZipFiles(prev => prev.map((f, idx) =>
            idx === i ? { ...f, status: "error" } : f
          ))
        }
      }

      // Check if at least one file was downloaded
      const successCount = filesList.filter((_, i) => {
        // We need to check updated state, but since we're in async, let's just check the folder
        return true
      }).length

      setZipPhase("compressing")

      const content = await zip.generateAsync({ type: "blob" })

      if (content.size < 100) {
        // ZIP is basically empty
        setZipPhase("error")
        setZipError("Aucun fichier n'a pu être récupéré")
        setTimeout(() => setZipOpen(false), 3000)
        return
      }

      saveAs(content, "Cooked_By_L2M.zip")
      setZipTotalSize(content.size)
      setZipPhase("done")

      // Auto close after 3 seconds
      setTimeout(() => setZipOpen(false), 3000)
    } catch (error) {
      console.error("ZIP error:", error)
      setZipPhase("error")
      setZipError("Erreur lors de la création du ZIP")
      setTimeout(() => setZipOpen(false), 4000)
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

      {/* ZIP Progress Modal */}
      <ZipProgressModal
        isOpen={zipOpen}
        items={zipFiles}
        currentIndex={zipIndex}
        totalSize={zipTotalSize}
        phase={zipPhase}
        errorMessage={zipError}
      />
    </main>
  )
}
