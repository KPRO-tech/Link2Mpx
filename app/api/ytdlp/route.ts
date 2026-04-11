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

    // URL du serveur yt-dlp sur HuggingFace
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_YTDLP_API_URL;

    // Étape 1 : Demander le téléchargement au serveur yt-dlp
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
        { success: false, error: "Nous n'avons pas pu analyser ce lien. Veuillez vérifier l'URL ou réessayer plus tard. / We could not analyze this link. Please check the URL or try again later." },
        { status: 400 }
      );
    }

    // Étape 2 : Construire l'URL du fichier téléchargeable
    const fileUrl = `${apiBaseUrl}${data.download_url}`;

    return NextResponse.json({
      success: true,
      downloadUrl: fileUrl,
      title: data.title || "video",
      fileSize: data.size || 0,
    });
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
