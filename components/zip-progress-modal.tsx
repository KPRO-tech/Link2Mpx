"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Package, CheckCircle2, XCircle, Loader2, FileDown } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

interface ZipProgressItem {
  name: string
  status: "pending" | "downloading" | "done" | "error"
  size?: number
}

interface ZipProgressModalProps {
  isOpen: boolean
  items: ZipProgressItem[]
  currentIndex: number
  totalSize: number
  phase: "fetching" | "compressing" | "done" | "error"
  errorMessage?: string
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

export function ZipProgressModal({
  isOpen,
  items,
  currentIndex,
  totalSize,
  phase,
  errorMessage,
}: ZipProgressModalProps) {
  const { t } = useI18n()
  const zipT = (t as any).zipModal

  if (!isOpen) return null

  const doneCount = items.filter((i) => i.status === "done").length
  const errorCount = items.filter((i) => i.status === "error").length
  const progressPercent =
    phase === "done"
      ? 100
      : phase === "compressing"
        ? 90
        : items.length > 0
          ? Math.round((doneCount / items.length) * 85)
          : 0

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">
                {phase === "done"
                  ? zipT?.ready || "Archive prête !"
                  : phase === "error"
                    ? zipT?.error || "Erreur"
                    : zipT?.title || "Création de l'archive ZIP"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {phase === "fetching" &&
                  `${zipT?.downloading || "Téléchargement"} ${doneCount}/${items.length} ${zipT?.files || "fichiers"}`}
                {phase === "compressing" && (zipT?.compressing || "Compression en cours...")}
                {phase === "done" &&
                  `${doneCount} ${zipT?.files || "fichier(s)"} • ${formatSize(totalSize)}`}
                {phase === "error" && (errorMessage || zipT?.errorOccurred || "Une erreur est survenue")}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-6">
            <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  phase === "error"
                    ? "bg-red-500"
                    : phase === "done"
                      ? "bg-accent"
                      : "bg-primary"
                }`}
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-1.5 mb-4">
              <span className="text-xs text-muted-foreground">{progressPercent}%</span>
              {totalSize > 0 && (
                <span className="text-xs text-muted-foreground">
                  {formatSize(totalSize)}
                </span>
              )}
            </div>
          </div>

          {/* File list */}
          <div className="px-6 pb-2 max-h-48 overflow-y-auto">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex-shrink-0">
                  {item.status === "pending" && (
                    <FileDown className="h-4 w-4 text-muted-foreground/50" />
                  )}
                  {item.status === "downloading" && (
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  )}
                  {item.status === "done" && (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  )}
                  {item.status === "error" && (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <span
                  className={`text-sm truncate flex-1 ${
                    item.status === "done"
                      ? "text-foreground"
                      : item.status === "error"
                        ? "text-red-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </span>
                {item.size && item.status === "done" && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatSize(item.size)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer animation */}
          {phase !== "done" && phase !== "error" && (
            <div className="px-6 py-4 bg-secondary/30 border-t border-border/30">
              <div className="flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                <span className="text-xs text-muted-foreground">
                  {phase === "compressing"
                    ? zipT?.compressing || "Compression des fichiers..."
                    : zipT?.fetchingFiles || "Récupération des fichiers depuis le serveur..."}
                </span>
              </div>
            </div>
          )}

          {phase === "done" && (
            <div className="px-6 py-4 bg-accent/5 border-t border-accent/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs text-accent font-medium">
                  {zipT?.downloadStarted || "Téléchargement de l'archive lancé !"}
                </span>
              </div>
            </div>
          )}

          {errorCount > 0 && phase === "done" && (
            <div className="px-6 py-2 pb-4">
              <span className="text-xs text-red-400">
                ⚠ {errorCount} {zipT?.files || "fichier(s)"} {zipT?.filesFailed || "n'ont pas pu être récupérés"}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
