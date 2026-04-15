import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { I18nProvider } from "@/lib/i18n/context"
import { AuthProvider } from "@/lib/firebase/auth-context"
import { PresenceTracker } from "@/components/presence-tracker"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Link2Mpx - Download videos in high quality",
  description:
    "Free, open source multi-platform video downloader. Download from Social Media.",
  generator: "Link2Mpx by KPRO.tech",
  keywords: [
    "video downloader",
    "youtube",
    "tiktok",
    "instagram",
    "free",
    "open source",
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/Link2Mpx-removebg-preview.png" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <I18nProvider>
            <AuthProvider>
              <PresenceTracker />
              {children}
              <Toaster
                richColors
                closeButton
                position="top-right"
                toastOptions={{
                  className: "!bg-card !text-foreground !border-border shadow-lg",
                }}
              />
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

