import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, format } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL manquante / Missing URL" },
        { status: 400 }
      );
    }

    const isInstagram = url.toLowerCase().includes("instagram.com");

    if (isInstagram) {
      // Stratégie Cobalt pour Instagram
      const cobaltApiUrl = process.env.NEXT_PUBLIC_COBALT_API_URL || "https://api.cobalt.tools"; // Fallback vers API publique au cas où

      const cobaltBody: any = {
        url: url,
        filenameStyle: "basic"
      };

      if (format === "mp3") {
        cobaltBody.downloadMode = "audio";
        cobaltBody.audioFormat = "mp3";
      }

      const response = await fetch(`${cobaltApiUrl}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cobaltBody),
      });

      if (!response.ok) {
        console.error("[Cobalt API] Error HTTP:", response.status);
        return NextResponse.json(
          { success: false, error: "Impossible de récupérer ce lien Instagram avec Cobalt. / Unable to fetch this Instagram link via Cobalt." },
          { status: 400 }
        );
      }

      const data = await response.json();

      if (data.status === "error") {
        console.error("[Cobalt API] Backend error:", data.error?.code);
        return NextResponse.json(
          { success: false, error: `Erreur Cobalt: ${data.error?.code || "Inconnue"}` },
          { status: 400 }
        );
      }

      // "tunnel" ou "redirect" contiennent l'URL de téléchargement direct
      if (data.status === "tunnel" || data.status === "redirect") {
        return NextResponse.json({
          success: true,
          downloadUrl: data.url,
          title: data.filename || "instagram_video",
          fileSize: 0,
        });
      }

      return NextResponse.json(
        { success: false, error: "Format de réponse inattendu de Cobalt / Unexpected Cobalt response format" },
        { status: 500 }
      );

    } else {
      // Stratégie yt-dlp d'origine
      const apiBaseUrl = process.env.NEXT_PUBLIC_YTDLP_API_URL;

      const downloadResponse = await fetch(`${apiBaseUrl}/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          format: format || "mp4",
        }),
      });

      if (!downloadResponse.ok) {
        const errorData = await downloadResponse.json().catch(() => null);
        console.error("[ytdlp API] Proxy error:", errorData?.error || `HTTP ${downloadResponse.status}`);
        return NextResponse.json(
          {
            success: false,
            error: "Nous n'avons pas pu analyser ce lien. Veuillez vérifier l'URL ou réessayer plus tard. / We could not analyze this link. Please check the URL or try again later.",
          },
          { status: downloadResponse.status }
        );
      }

      const data = await downloadResponse.json();

      if (data.error) {
        console.error("[ytdlp API] Backend error:", data.error);
        return NextResponse.json(
          { success: false, error: data.error },
          { status: 400 }
        );
      }

      const fileUrl = `${apiBaseUrl}${data.download_url}`;

      return NextResponse.json({
        success: true,
        downloadUrl: fileUrl,
        title: data.title || "video",
        fileSize: data.size || 0,
      });
    }

  } catch (error) {
    console.error("[ytdlp API]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Un problème technique inattendu est survenu. Veuillez réessayer plus tard. / An unexpected technical issue occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
