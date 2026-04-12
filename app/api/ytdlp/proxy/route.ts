import { NextResponse } from "next/server";

/**
 * Proxies file downloads from the yt-dlp HuggingFace server.
 * This avoids CORS issues when fetching files client-side (e.g. for ZIP creation).
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { error: "URL du fichier manquante / Missing file URL" },
        { status: 400 }
      );
    }

    // Fetch the file from HuggingFace
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Erreur lors du téléchargement du fichier / Error downloading file (${response.status})` },
        { status: response.status }
      );
    }

    const blob = await response.blob();
    const headers = new Headers();
    headers.set("Content-Type", response.headers.get("Content-Type") || "application/octet-stream");
    headers.set("Content-Length", blob.size.toString());
    
    const filename = searchParams.get("filename");
    if (filename) {
      headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
    }

    // Allow streaming from client
    headers.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("[ytdlp proxy]", error);
    return NextResponse.json(
      { error: "Erreur proxy fichier / File proxy error" },
      { status: 500 }
    );
  }
}
