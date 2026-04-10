import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, format } = body;

    const isAudioOnly = format === "mp3";

    const requestBody = {
      url: url,
      videoQuality: "max",
      downloadMode: isAudioOnly ? "audio" : "auto",
      audioFormat: "mp3",
      youtubeVideoCodec: "h264",
      alwaysProxy: true,
    };

    // Liste d'instances par défaut (qui peuvent nécessiter ce proxy pour éviter les erreurs CORS)
    const apiUrls = process.env.NEXT_PUBLIC_COBALT_URL
      ? [process.env.NEXT_PUBLIC_COBALT_URL]
      : [
        "https://sunny.imput.net",
        "https://nachos.imput.net",
        "https://kityune.imput.net",

        "https://nuko-c.meowing.de",
        "https://lime.clxxped.lol"
      ];

    const apiKey = process.env.NEXT_PUBLIC_COBALT_API_KEY;

    let lastError = "Toutes les instances ont échoué.";

    for (const apiUrl of apiUrls) {
      try {
        const headers: Record<string, string> = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        };

        if (apiKey) {
          headers["Authorization"] = `Api-Key ${apiKey}`;
        }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const text = await response.text();
          try {
            const errorData = JSON.parse(text);
            lastError = errorData.text || errorData?.error?.code || `Erreur: ${response.status} sur ${apiUrl}`;
          } catch {
            lastError = `Erreur: ${response.status} sur ${apiUrl}`;
          }
          continue;
        }

        const text = await response.text();
        if (!text) {
          lastError = `Réponse vide sur ${apiUrl}`;
          continue;
        }

        const data = JSON.parse(text);

        if (data.status === "error") {
          lastError = data.text || data.error?.code || "Erreur interne";
          continue;
        }

        if (data.url) {
          return NextResponse.json({
            success: true,
            downloadUrl: data.url,
          });
        }
      } catch (err) {
        lastError = err instanceof Error ? err.message : "Erreur réseau inconnue";
      }
    }

    return NextResponse.json({
      success: false,
      error: lastError,
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Erreur inattendue serveur",
    }, { status: 500 });
  }
}
