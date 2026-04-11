export interface YtdlpDownloadResponse {
  success: boolean
  downloadUrl?: string
  title?: string
  fileSize?: number
  error?: string
}

export interface YtdlpInfoResponse {
  title?: string
  duration?: number
  thumbnail?: string
  uploader?: string
  extractor?: string
  formats_count?: number
  error?: string
}

/**
 * Download a video/audio via the yt-dlp HuggingFace server.
 * Steps:
 *  1. POST /download → gets back { filename, download_url, title }
 *  2. Build full URL to /file/<filename>
 */
export async function ytdlpDownload(url: string, format: "mp4" | "mp3" = "mp4"): Promise<YtdlpDownloadResponse> {
  try {
    const response = await fetch("/api/ytdlp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, format }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Une erreur inattendue est survenue.",
    }
  }
}
