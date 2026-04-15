# Link2Mpx - Open Source Media Downloader 🚀

Link2Mpx is a completely free, serverless, open-source media downloader designed to seamlessly fetch high-quality videos and audio from popular platforms (TikTok, Instagram, Twitter/X, Reddit, Facebook, etc.). The project relies on a standalone `yt-dlp` API backend, proxied entirely server-side to guarantee CORS-bypassing and frictionless downloads.

> **Note on YouTube:** Due to aggressive bot-protection and IP-blocking from YouTube, downloading from YouTube is officially disabled on our main instances to preserve server health and avoid infinite maintenance scaling costs. 

## ✨ Features
- **Modern Architecture**: Built entirely on Next.js 14 App Router.
- **Top-tier Quality**: Grabs the highest available streams (bestvideo+bestaudio fallback chains).
- **Robust API Proxy**: Avoids all browser CORS issues and ad-blockers by securely proxying the download through Next.js directly to the yt-dlp backend.
- **Smart Quotas & Queues**: Features user quotas via Firebase (5/day for anonymous, 20/day authenticated) and interactive download queues with renaming tools and sequential ZIP creation.
- **Dynamic Multi-Linking**: Drop dozens of URLs into the textarea, and the app gracefully queues and processes them instantly.
- **Bilingual Interface**: Fully translated into English and French.

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router) + React
- **Database**: Firebase (Auth, Firestore, Realtime Database for active stats)
- **Styling**: Tailwind CSS + Framer Motion for premium, lively UI
- **API Engine**: Custom standalone `yt-dlp` Python Flask server proxied internally.

## 📦 Setting Up Your Own Instance

### 1. Pre-requisites
- Node.js >= 18
- Firebase project configured

### 2. Environment Setup
Create a `.env.local` based on `.env.example`.
```env
# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
NEXT_PUBLIC_FIREBASE_APP_ID=your_value
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_value
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_value

# yt-dlp API Configuration
NEXT_PUBLIC_YTDLP_API_URL=https://[YOUR-USERNAME]-[YOUR-SPACE-NAME].hf.space
```

### 3. Deploying a Free Personal API (Hugging Face)
Because Link2Mpx is a frontend, it needs a backend to parse and download URLs without CORS issues. We recommend setting up a 100% free instance on Hugging Face Spaces using our `yt-dlp` image:

1. Create a [Hugging Face](https://huggingface.co/) account and start a new **Docker** Space (Blank template).

2. Create `app.py`:
```python
import os
import re
import uuid
import subprocess
import json
import time
import threading
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dossier temporaire pour les fichiers telecharges
DOWNLOAD_DIR = "/tmp/downloads"
COOKIES_FILE = "/app/cookies.txt"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# Verifie si le fichier cookies existe
HAS_COOKIES = os.path.exists(COOKIES_FILE)
if HAS_COOKIES:
    print(f"Fichier cookies trouve : {COOKIES_FILE}")
else:
    print("Pas de fichier cookies.txt")


# Nettoyage automatique des fichiers de plus de 10 min
def cleanup_old_files():
    while True:
        time.sleep(120)
        now = time.time()
        for f in os.listdir(DOWNLOAD_DIR):
            filepath = os.path.join(DOWNLOAD_DIR, f)
            if os.path.isfile(filepath) and now - os.path.getmtime(filepath) > 600:
                try:
                    os.remove(filepath)
                except:
                    pass

cleanup_thread = threading.Thread(target=cleanup_old_files, daemon=True)
cleanup_thread.start()


def get_cookie_args():
    """Retourne les arguments cookies pour yt-dlp si le fichier existe."""
    if HAS_COOKIES:
        return ["--cookies", COOKIES_FILE]
    return []


def get_youtube_args():
    """Arguments speciaux pour YouTube pour contourner la detection bot."""
    return [
        "--extractor-args", "youtube:player_client=ios,web",
    ]


@app.route("/", methods=["GET"])
def health():
    cookie_info = {}
    if HAS_COOKIES:
        try:
            with open(COOKIES_FILE, "r") as f:
                content = f.read()
                cookie_info["size"] = len(content)
                cookie_info["lines"] = len(content.splitlines())
                cookie_info["has_youtube"] = ".youtube.com" in content
                cookie_info["has_reddit"] = ".reddit.com" in content
                cookie_info["has_facebook"] = ".facebook.com" in content
        except:
            pass

    return jsonify({
        "status": "ok",
        "service": "Link2Mpx yt-dlp API",
        "version": "1.2.0",
        "cookies": HAS_COOKIES,
        "cookie_info": cookie_info
    })


@app.route("/info", methods=["POST"])
def get_info():
    """Recupere les metadonnees d'une video sans la telecharger."""
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL manquante"}), 400

    try:
        cmd = ["yt-dlp", "--impersonate", "chrome", "--dump-json", "--no-download", "--no-warnings"]

        # Ajouter les args YouTube si c'est une URL YouTube
        if "youtube.com" in url or "youtu.be" in url:
            cmd += get_youtube_args()

        cmd += get_cookie_args() + [url]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode != 0:
            return jsonify({"error": result.stderr.strip() or "Impossible d'extraire les infos"}), 400

        info = json.loads(result.stdout)
        return jsonify({
            "title": info.get("title", "Inconnu"),
            "duration": info.get("duration"),
            "thumbnail": info.get("thumbnail"),
            "uploader": info.get("uploader"),
            "extractor": info.get("extractor"),
            "formats_count": len(info.get("formats", [])),
        })
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Timeout: la video met trop de temps a analyser"}), 408
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/download", methods=["POST"])
def download():
    """Telecharge une video/audio et retourne l'URL du fichier."""
    data = request.get_json()
    url = data.get("url")
    format_type = data.get("format", "mp4")

    if not url:
        return jsonify({"error": "URL manquante"}), 400

    file_id = str(uuid.uuid4())[:8]
    cookie_args = get_cookie_args()
    is_youtube = "youtube.com" in url or "youtu.be" in url
    yt_args = get_youtube_args() if is_youtube else []

    if format_type == "mp3":
        output_template = os.path.join(DOWNLOAD_DIR, f"{file_id}.%(ext)s")
        cmd = [
            "yt-dlp",
            "--impersonate", "chrome",
            "-f", "ba/b",
            "-x",
            "--audio-format", "mp3",
            "--audio-quality", "0",
            "-o", output_template,
            "--no-playlist",
            "--no-warnings",
            "--restrict-filenames",
            "--max-filesize", "500M",
        ] + yt_args + cookie_args + [url]
    else:
        output_template = os.path.join(DOWNLOAD_DIR, f"{file_id}.%(ext)s")
        cmd = [
            "yt-dlp",
            "--impersonate", "chrome",
            "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best",
            "--merge-output-format", "mp4",
            "-o", output_template,
            "--no-playlist",
            "--no-warnings",
            "--restrict-filenames",
            "--max-filesize", "2G",
        ] + yt_args + cookie_args + [url]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

        if result.returncode != 0:
            error_msg = result.stderr.strip()
            if "is not a valid URL" in error_msg:
                error_msg = "URL invalide"
            elif "Video unavailable" in error_msg:
                error_msg = "Video indisponible"
            elif "Private video" in error_msg:
                error_msg = "Video privee"
            return jsonify({"error": error_msg or "Echec du telechargement"}), 400

        # Trouver le fichier telecharge
        downloaded_file = None
        for f in os.listdir(DOWNLOAD_DIR):
            if f.startswith(file_id):
                downloaded_file = os.path.join(DOWNLOAD_DIR, f)
                break

        if not downloaded_file or not os.path.exists(downloaded_file):
            return jsonify({"error": "Fichier non trouve apres telechargement"}), 500

        # Extraire le titre
        title = "video"
        try:
            title_cmd = ["yt-dlp", "--print", "title", "--no-download"] + yt_args + cookie_args + [url]
            title_result = subprocess.run(title_cmd, capture_output=True, text=True, timeout=10)
            if title_result.returncode == 0 and title_result.stdout.strip():
                title = re.sub(r'[^\w\s\-]', '', title_result.stdout.strip())[:100]
        except:
            pass

        file_basename = os.path.basename(downloaded_file)

        return jsonify({
            "status": "ok",
            "filename": file_basename,
            "title": title,
            "download_url": f"/file/{file_basename}",
            "size": os.path.getsize(downloaded_file)
        })

    except subprocess.TimeoutExpired:
        for f in os.listdir(DOWNLOAD_DIR):
            if f.startswith(file_id):
                try:
                    os.remove(os.path.join(DOWNLOAD_DIR, f))
                except:
                    pass
        return jsonify({"error": "Timeout: le telechargement a pris trop de temps (max 5 min)"}), 408
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/file/<filename>", methods=["GET"])
def serve_file(filename):
    """Sert un fichier telecharge."""
    filepath = os.path.join(DOWNLOAD_DIR, filename)

    if not os.path.exists(filepath):
        return jsonify({"error": "Fichier non trouve ou expire"}), 404

    return send_file(
        filepath,
        as_attachment=True,
        download_name=filename
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    app.run(host="0.0.0.0", port=port)
```

3. Create `requirements.txt`:
```text
flask==3.1.0
flask-cors==5.0.0
gunicorn==23.0.0
```

4. Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

# Installer ffmpeg et yt-dlp
RUN apt-get update && \
    apt-get install -y --no-install-recommends ffmpeg curl && \
    pip install --no-cache-dir --pre yt-dlp && \
    pip install --no-cache-dir curl-cffi && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier TOUT le projet (y compris cookies.txt)
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

# CrÃ©er le dossier de tÃ©lÃ©chargement
RUN mkdir -p /tmp/downloads

# Port par dÃ©faut de HF Spaces
EXPOSE 7860

# Lancer avec gunicorn pour la production
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--timeout", "600", "--workers", "2", "app:app"]
```

5. **[IMPORTANT] Bypass Login Restrictions with `cookies.txt`**  
   To download videos from age-restricted or private sources on sites like YouTube, Facebook, or Reddit, you need to provide your session cookies to the server. You can extract these easily using the **"Get cookies.txt LOCALLY"** extension:
   - [Get cookies.txt LOCALLY (Chrome Web Store)](https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)
   
   **How to combine cookies for multiple platforms:**
   a. Go to **youtube.com** and log in to a Google account. Click the extension icon → **"Export"**. This will download a file (e.g., `youtube_cookies.txt`).
   b. Go to **facebook.com** and log in. Use the extension again to export `facebook_cookies.txt`.
   c. Go to **reddit.com** and log in. Export `reddit_cookies.txt`.
   d. Go to **instagram.com** and log in. Use the extension again to export `instagram_cookies.txt`.
   e. Open all three downloaded text files on your computer.
   f. Create a new, blank text file named `cookies.txt`.
   g. Copy the entire contents of all three files and paste them one after the other into your single `cookies.txt` file.
   h. Save the combined `cookies.txt` file.


    > **[🔴WARNING🔴]**
    > Use a **secondary account** (not your main account) because cookies contain your session. If the platforms detect suspicious activity, it could limit the account.

6. Add the `cookies.txt` file to your HuggingFace Space

    - Go to your Space files on HuggingFace
    - Click **"Add file"** → **"Upload files"**
    - Upload your `cookies.txt` file to the root of the project (same level as `app.py`)

7. Copy your specific Space Direct URL and paste it into `.env.local` as `NEXT_PUBLIC_YTDLP_API_URL`.

8. Run `npm run dev` and enjoy your downloads!

## 🤝 Contributing
Contributions are totally welcome! Whether it's adding new platforms, fixing UI bugs, or localizing new languages, just open a Pull Request.

## Support us
If you find this project useful, consider supporting us by giving a star ⭐ on GitHub and sharing it with your friends.
