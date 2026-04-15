"use client"

import { useState } from "react"
import { Download, Loader2, XCircle, CheckCircle2, Pencil } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n/context"

export type QueueItem = {
  id: string
  url: string
  status: "pending" | "processing" | "ready" | "error"
  format: "mp4" | "mp3"
  downloadUrl?: string
  errorMsg?: string
  customName?: string
}

interface DownloadQueueProps {
  items: QueueItem[]
  onDownload: (url: string, filename: string) => void
  onRemove: (id: string) => void
  onDownloadAll: () => void
  onRename?: (id: string, newName: string) => void
}

export function DownloadQueue({ items, onDownload, onRemove, onDownloadAll, onRename }: DownloadQueueProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())
  const { t } = useI18n()

  if (items.length === 0) return null

  const allReady = items.length > 0 && items.every((i) => i.status === "ready")
  const processing = items.some((i) => i.status === "processing")

  const handleEdit = (item: QueueItem) => {
    setEditingId(item.id)
    setEditValue(item.customName || `video_${item.id}`)
  }

  const handleSave = (id: string) => {
    if (onRename && editValue.trim()) {
      onRename(id, editValue.trim())
    }
    setEditingId(null)
  }

  const handleDownloadClick = (item: QueueItem) => {
    setDownloadingIds((prev) => new Set(prev).add(item.id))
    onDownload(item.downloadUrl!, item.customName ? `${item.customName}.${item.format}` : `video_${item.id}.${item.format}`)
    
    // Reset loading state after a short delay since download triggers externally
    setTimeout(() => {
      setDownloadingIds((prev) => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
    }, 2000)
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 flex flex-col gap-4 px-4 relative z-10">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-between p-4 rounded-2xl glass-strong border border-foreground/5"
          >
            <div className="flex flex-col gap-1 overflow-hidden pr-4 w-full">
              {editingId === item.id ? (
                <input
                  type="text"
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleSave(item.id)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave(item.id)}
                  className="bg-background/50 text-sm font-medium text-foreground px-2 py-1 rounded w-full outline-none ring-1 ring-primary/50"
                  placeholder="Nom du fichier..."
                />
              ) : (
                <span className="text-sm font-medium truncate w-full flex items-center gap-2">
                  <span className="text-foreground flex-1 truncate" title={item.url}>
                    {item.customName ? `${item.customName}.${item.format}` : item.url}
                  </span>
                  {item.status === "ready" && (
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1 hover:bg-foreground/10 rounded transition-colors text-muted-foreground flex-shrink-0"
                      title="Renommer le fichier"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                  )}
                </span>
              )}
              <span className="text-xs font-bold text-primary uppercase">
                {item.format}
              </span>
              {item.errorMsg && (
                <span className="text-xs text-red-500">{item.errorMsg}</span>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {item.status === "processing" && (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              )}
              {item.status === "error" && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              {item.status === "ready" && item.downloadUrl && (
                <button
                  onClick={() => handleDownloadClick(item)}
                  disabled={downloadingIds.has(item.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {downloadingIds.has(item.id) ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.download.downloading}
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      {t.download.downloadBtn}
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 hover:bg-foreground/10 rounded-full transition-colors text-muted-foreground"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {items.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end mt-2"
        >
          <button
            onClick={onDownloadAll}
            disabled={!allReady || processing}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold text-sm hover:bg-secondary/80 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t.download.downloadAll}
          </button>
        </motion.div>
      )}
    </div>
  )
}
