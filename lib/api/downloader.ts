export interface CobaltResponse {
  status: "error" | "redirect" | "stream" | "success" | "rate-limit" | "picker" | "tunnel"
  url?: string
  text?: string
}

export interface DownloadResponse {
  success: boolean
  downloadUrl?: string
  error?: string
}

export async function analyzeAndDownload(url: string, format: "mp4" | "mp3" = "mp4"): Promise<DownloadResponse> {
  try {
    const response = await fetch("/api/download", {
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
      error: error instanceof Error ? error.message : "Une erreur inattendue est survenue côté navigateur.",
    }
  }
}

// Youtube, twitter, reedit
