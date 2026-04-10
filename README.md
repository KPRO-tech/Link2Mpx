# Link2Mpx - Open Source Media Downloader 🚀

Link2Mpx is a completely free, serverless, open-source media downloader designed to seamlessly fetch high-quality videos and audio from popular platforms (TikTok, Instagram, Facebook, etc.). The project relies on the robust Cobalt API, proxied entirely server-side to guarantee CORS-bypassing and frictionless downloads.

## ✨ Features
- **Serverless Architecture**: Built entirely on Next.js App Router.
- **Top-tier Quality**: Defaults to `videoQuality: "max"`, grabbing up to 4K streams when available.
- **Robust API Proxy**: Avoids all browser CORS issues and ad-blockers by securely proxying the download through Next.js directly to Cobalt. Includes fallback strategies to 5 dynamic community instances.
- **Smart Quotas & Queues**: Features user quotas via Firebase (5/day for anonymous, 20/day authenticated) and interactive download queues with renaming tools and ZIP creation.
- **Dynamic Multi-Linking**: Drop dozens of URLs into the textarea, and the app gracefully queues and processes them instantly.

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router) + React 19
- **Database**: Firebase (Auth, Firestore, Realtime Database for active stats)
- **Styling**: Tailwind CSS + Framer Motion for premium, lively UI
- **API Engine**: Cobalt (ghcr.io/imputnet/cobalt:11) proxied internally.

## 📦 Setting Up Your Own Instance

### 1. Pre-requisites
- Node.js >= 18
- Firebase project configured
- (Optional but highly recommended) Your own free Cobalt instance.

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

# Cobalt API Configuration (Leave blank to use default fallback proxies)
NEXT_PUBLIC_COBALT_URL=
NEXT_PUBLIC_COBALT_API_KEY=
```

### 3. Deploying a Free Personal API (Hugging Face)
Since public Cobalt APIs aggressively block unknown datacenter/frontend requests, we recommend setting up a 100% free instance on Hugging Face Spaces:
1. Create a [Hugging Face](https://huggingface.co/) account and start a new **Docker** Space (Blank template).
2. Create a `Dockerfile` with the following content:
```dockerfile
FROM ghcr.io/imputnet/cobalt:11
ENV API_PORT=7860
ENV API_URL=https://[YOUR-USERNAME]-[YOUR-SPACE-NAME].hf.space/
```
3. Copy your specific Space Direct URL and paste it into `.env.local` as `NEXT_PUBLIC_COBALT_URL`.
4. Run `npm run dev` and enjoy unrestricted downloads!

## 🤝 Contributing
Contributions are totally welcome! Whether it's adding new platforms (Twitter/Reddit bypassers), fixing UI bugs, or localizing new languages, just open a Pull Request.
