"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"
import { ExternalLink, ArrowRight, MonitorPlay, Zap, Earth, CheckCircle2, Plus } from "lucide-react"

// ==========================================
// CONFIGURATION DU COMPTE À REBOURS
// ==========================================
// Vous pouvez modifier facilement la date et l'heure ici.
// Format standard : "AAAA-MM-JJTHH:MM:SS" (ex: "2026-04-14T02:00:00" pour Mardi 14 Avril 2026 à 2h du matin)
const TARGET_DATE_STRING = "2026-04-15T03:00:00"

export default function ComingSoonPage() {

  const { t, locale, setLocale } = useI18n()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setMounted(true)

    // On utilise la date configurée ci-dessus
    const target = new Date(TARGET_DATE_STRING)

    const interval = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)

    document.title = "Link2Mpx...";


    return () => clearInterval(interval)
  }, [])

  const toggleLang = () => {
    setLocale(locale === "fr" ? "en" : "fr")
  }

  const kproUrl = process.env.NEXT_PUBLIC_KPRO_WEBSITE_URL || "https://kprotech.vercel.app/"

  if (!mounted) return null // Prevent hydration mismatch on initial render

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 overflow-x-hidden text-foreground pb-20">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 z-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none opacity-40 mix-blend-screen" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none opacity-30 mix-blend-screen" />

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-foreground/5 transition-colors shadow-sm"
        >
          <Earth className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold uppercase">{locale}</span>
        </button>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-12 flex flex-col items-center">

        {/* LOGO & TITLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <div className="relative w-32 md:w-48 h-auto">
            <Image
              src="/Link2Mpx-removebg-preview.png"
              alt="Link2Mpx Logo"
              width={250}
              height={100}
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight gradient-text text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.hero?.title || "Link2Mpx"}
          </motion.h1>
        </motion.div>

        {/* HERO COPY & CONTEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-3xl mb-12"
        >
          <p className="text-base md:text-lg text-white mx-auto leading-relaxed mb-8">
            {t.hero?.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            {["Audio MP3", "Video MP4",].map((platform, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground/5 border border-foreground/10 text-foreground/80 shadow-sm transition-all hover:bg-foreground/10 hover:border-foreground/20">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                {platform}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            {["Zip Doc", "Batch", "Custom"].map((platform, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground/5 border border-foreground/10 text-foreground/80 shadow-sm transition-all hover:bg-foreground/10 hover:border-foreground/20">
                <CheckCircle2 className="h-3 w-3 text-white" />
                {platform}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {["TikTok", "Instagram", "Twitter/X", "SnapChat"].map((platform, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground/5 border border-foreground/10 text-foreground/80 shadow-sm transition-all hover:bg-foreground/10 hover:border-foreground/20">
                <CheckCircle2 className="h-3 w-3 text-primary" />
                {platform}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground/5 border border-foreground/10 text-foreground/80 shadow-sm transition-all hover:bg-foreground/10 hover:border-foreground/20">
              <Plus className="h-3 w-3 text-primary" />
              300 Sites
            </span>
          </div>
        </motion.div>

        {/* COUNTDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 mb-24 flex flex-col items-center w-full"
        >
          <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-primary mb-6 flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full border border-primary/20 glow-orange">
            <Zap className="h-4 w-4" />
            {t.comingSoon?.launchingIn}
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {[
              { label: t.comingSoon?.days || "Jours", value: timeLeft.days },
              { label: t.comingSoon?.hours || "Heures", value: timeLeft.hours },
              { label: t.comingSoon?.minutes || "Minutes", value: timeLeft.minutes },
              { label: t.comingSoon?.seconds || "Secondes", value: timeLeft.seconds }
            ].map((block, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem] md:w-[7rem] md:h-[7rem] flex items-center justify-center glass-strong border border-white/5 group-hover:border-primary/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl mb-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:glow-orange">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-foreground">
                    {block.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TEASER SECTION (Simulated Browser window) */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
          style={{ perspective: 1200 }}
          className="w-full max-w-5xl mb-32"
        >
          <div className="rounded-2xl border border-white/10 bg-black/40 shadow-2xl overflow-hidden glass-strong ring-1 ring-white/5 mx-auto">
            {/* Browser Header */}
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-4">
              <div className="mx-auto flex items-center justify-center gap-2 bg-black/20 px-6 py-1.5 rounded-md text-xs font-medium text-white/50 w-full max-w-md border border-white/5 shadow-inner">
                <MonitorPlay className="h-3 w-3" />
                <span className="tracking-wide"><span className="gradient-text font-bold">link2mpx</span></span>
              </div>
              <div className="w-auto" /> {/* Placeholder to center the url bar */}
            </div>

            {/* Simulated App Video Background */}
            <div className="relative aspect-video bg-muted/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/Link2Mpx-out.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* CREATOR KPRO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl pb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#3b82f6] uppercase mb-4">
              {t.comingSoon?.kproTitle}
            </h2>
          </div>

          <div
            className="rounded-3xl overflow-hidden border border-[#1e3a8a]/30 shadow-2xl relative"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            }}
          >
            {/* Glow effect */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#3b82f6]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#3b82f6]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-14 relative z-10">
              <div className="flex-shrink-0">
                <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full overflow-hidden border-2 border-[#3b82f6]/40 shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-black/50">
                  <Image
                    src="/logokpt.png"
                    alt="KPRO.tech"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                <a
                  href={kproUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group mb-2"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                    <span>K</span>
                    <span className="text-white">PRO.</span>
                    <span>tech</span>
                  </h3>
                </a>

                <p className="text-white text-sm md:text-base font-bold mb-4 w-fit px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20">
                  <span className="text-[#3b82f6]">T</span>ech <span className="text-[#3b82f6]">O</span>ver <span className="text-[#3b82f6]">E</span>verything
                </p>

                <p className="text-slate-300/80 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                  {t.comingSoon?.kproDesc}
                </p>

                <a
                  href={kproUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm md:text-base font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-0.5"
                >
                  {t.comingSoon?.kproVisit || "Visiter le créateur"}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  )
}




// "use client"

// import { useState } from "react"
// import JSZip from "jszip"
// import { saveAs } from "file-saver"
// import { toast } from "sonner"
// import { StatsSection } from "@/components/stats-section"
// import { FeaturesSection } from "@/components/features-section"
// import { AuthModal } from "@/components/auth-modal"
// import { Footer } from "@/components/footer"
// import { CookieBanner } from "@/components/cookie-banner"
// import { ytdlpDownload } from "@/lib/api/ytdlp"
// import { useI18n } from "@/lib/i18n/context"
// import { DownloadQueue, type QueueItem } from "@/components/download-queue"
// import { useQuota } from "@/hooks/use-quota"
// import { useAuth } from "@/lib/firebase/auth-context"
// import { HeroSection } from "@/components/hero-section"
// import { ZipProgressModal } from "@/components/zip-progress-modal"
// import { Navbar } from "@/components/navbar"

// interface ZipFileProgress {
//   name: string
//   status: "pending" | "downloading" | "done" | "error"
//   size?: number
// }

// export default function YtdlpTestPage() {
//   const { t } = useI18n()
//   const [authOpen, setAuthOpen] = useState(false)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [queue, setQueue] = useState<QueueItem[]>([])

//   // ZIP progress state
//   const [zipOpen, setZipOpen] = useState(false)
//   const [zipFiles, setZipFiles] = useState<ZipFileProgress[]>([])
//   const [zipIndex, setZipIndex] = useState(0)
//   const [zipTotalSize, setZipTotalSize] = useState(0)
//   const [zipPhase, setZipPhase] = useState<"fetching" | "compressing" | "done" | "error">("fetching")
//   const [zipError, setZipError] = useState<string | undefined>()

//   const { user } = useAuth()
//   const { canDownload, incrementQuota } = useQuota()

//   const handleAnalyze = async (urls: string[], format: "mp4" | "mp3") => {
//     const validUrls = urls.filter(u => u.trim().length > 0)
//     if (validUrls.length === 0) return

//     setIsAnalyzing(true)

//     const newItems: QueueItem[] = validUrls.map(url => ({
//       id: Math.random().toString(36).substr(2, 9) + Date.now(),
//       url,
//       format,
//       status: "pending"
//     }))

//     setQueue(prev => [...newItems, ...prev])

//     for (const item of newItems) {
//       // Check Youtube
//       const urlLower = item.url.toLowerCase()
//       if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
//          const warningText = (t.warning as any).youtubeBlocked || "YouTube downloading is disabled."
//          toast.error(warningText, { duration: 6000 })
//          setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "error", errorMsg: "YouTube \u274c" } : q))
//          continue
//       }

//       if (!canDownload) {
//         toast.error(t.download.quotaExhausted)
//         const pendingIds = newItems.slice(newItems.indexOf(item)).map(i => i.id)
//         setQueue(prev => prev.map(q => pendingIds.includes(q.id) ? { ...q, status: "error", errorMsg: t.download.quotaExhausted } : q))
//         if (!user) {
//           setAuthOpen(true)
//         }
//         break
//       }

//       setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "processing" } : q))

//       const result = await ytdlpDownload(item.url, item.format)

//       if (result.success && result.downloadUrl) {
//         setQueue(prev => prev.map(q => q.id === item.id ? {
//           ...q,
//           status: "ready",
//           downloadUrl: result.downloadUrl,
//           customName: result.title || undefined
//         } : q))
//         await incrementQuota(item.id)
//       } else {
//         setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "error", errorMsg: result.error } : q))
//         toast.error(result.error || t.download.error)
//       }
//     }

//     setIsAnalyzing(false)
//   }

// const handleDownloadFile = (downloadUrl: string, filename: string) => {
//   const proxyUrl = `/api/ytdlp/proxy?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`
//   const a = document.createElement('a')
//   a.href = proxyUrl
//   a.target = '_blank'
//   a.download = filename // Fallback
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
// }


//   const handleDownloadAll = async () => {
//     const readyItems = queue.filter(q => q.status === "ready" && q.downloadUrl)
//     if (readyItems.length === 0) return

//     // Init ZIP progress modal
//     const filesList: ZipFileProgress[] = readyItems.map(item => ({
//       name: item.customName
//         ? `${item.customName}.${item.format}`
//         : `video_${item.id}.${item.format}`,
//       status: "pending"
//     }))
//     setZipFiles(filesList)
//     setZipIndex(0)
//     setZipTotalSize(0)
//     setZipPhase("fetching")
//     setZipError(undefined)
//     setZipOpen(true)

//     try {
//       const zip = new JSZip()
//       const folder = zip.folder("Cooked_By_L2M")
//       let totalSize = 0

//       // Download files sequentially for progress tracking
//       for (let i = 0; i < readyItems.length; i++) {
//         const item = readyItems[i]
//         const fileName = filesList[i].name

//         setZipIndex(i)
//         setZipFiles(prev => prev.map((f, idx) =>
//           idx === i ? { ...f, status: "downloading" } : f
//         ))

//         try {
//           // Use the proxy route to avoid CORS issues
//           const proxyUrl = `/api/ytdlp/proxy?url=${encodeURIComponent(item.downloadUrl!)}`
//           const response = await fetch(proxyUrl)

//           if (!response.ok) throw new Error(`HTTP ${response.status}`)

//           const blob = await response.blob()
//           folder?.file(fileName, blob)
//           totalSize += blob.size

//           setZipTotalSize(totalSize)
//           setZipFiles(prev => prev.map((f, idx) =>
//             idx === i ? { ...f, status: "done", size: blob.size } : f
//           ))
//         } catch (error) {
//           console.error(`Erreur fetch ${fileName}:`, error)
//           setZipFiles(prev => prev.map((f, idx) =>
//             idx === i ? { ...f, status: "error" } : f
//           ))
//         }
//       }

//       // Check if at least one file was downloaded
//       const successCount = filesList.filter((_, i) => {
//         // We need to check updated state, but since we're in async, let's just check the folder
//         return true
//       }).length

//       setZipPhase("compressing")

//       const content = await zip.generateAsync({ type: "blob" })

//       if (content.size < 100) {
//         // ZIP is basically empty
//         setZipPhase("error")
//         setZipError("Aucun fichier n'a pu être récupéré")
//         setTimeout(() => setZipOpen(false), 3000)
//         return
//       }

//       saveAs(content, "Cooked_By_L2M.zip")
//       setZipTotalSize(content.size)
//       setZipPhase("done")

//       // Auto close after 3 seconds
//       setTimeout(() => setZipOpen(false), 3000)
//     } catch (error) {
//       console.error("ZIP error:", error)
//       setZipPhase("error")
//       setZipError("Erreur lors de la création du ZIP")
//       setTimeout(() => setZipOpen(false), 4000)
//     }
//   }

//   const handleRemove = (id: string) => {
//     setQueue(prev => prev.filter(q => q.id !== id))
//   }

//   const handleRename = (id: string, newName: string) => {
//     setQueue(prev => prev.map(q => q.id === id ? { ...q, customName: newName } : q))
//   }

//   return (
//     <main className="min-h-screen flex flex-col">
//       <Navbar onOpenAuth={() => setAuthOpen(true)} />

//       <HeroSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

//       <div className="-mt-12 mb-20 relative z-20">
//         <DownloadQueue
//           items={queue}
//           onDownload={handleDownloadFile}
//           onDownloadAll={handleDownloadAll}
//           onRemove={handleRemove}
//           onRename={handleRename}
//         />
//       </div>

//       <StatsSection />
//       <FeaturesSection />

//       <Footer />

//       <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
//       <CookieBanner />

//       {/* ZIP Progress Modal */}
//       <ZipProgressModal
//         isOpen={zipOpen}
//         items={zipFiles}
//         currentIndex={zipIndex}
//         totalSize={zipTotalSize}
//         phase={zipPhase}
//         errorMessage={zipError}
//       />
//     </main>
//   )
// }