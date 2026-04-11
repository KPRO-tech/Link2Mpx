"use client"

import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()
  const kproUrl = process.env.NEXT_PUBLIC_KPRO_WEBSITE_URL || "https://kprotech.vercel.app"

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Link2Mpx_de-face_-removebg-preview.png"
                alt="Link2Mpx"
                width={32}
                height={32}
                className="h-8 w-auto"
                style={{ width: "auto" }}
              />
              <span className="font-bold gradient-text">Link2Mpx</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.footer.free}
            </p>
            <p className="text-xs text-muted-foreground">
              BY{" "}
              <a
                href={kproUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-[#1e3a8a] transition-colors"
              >
                <span>K</span>
                <span className="text-foreground">PRO</span>
                <span>.tech</span>
              </a>
            </p>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              {t.footer.legal}
            </h4>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/legal-notice"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.legalNotice}
            </Link>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              {t.footer.support}
            </h4>
            <Link
              href="/about"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/faq"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.faqLink}
            </Link>
            <a
              href={`mailto:contact@kprotech.com`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.contact}
            </a>
          </div>

          {/* Community */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              {t.footer.community}
            </h4>
            <a
              href="https://github.com/KPRO-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.github} KPRO-tech
            </a>
            <a
              href="https://github.com/KPRO-tech/Link2Mpx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.footer.contribute}
            </a>
            <span className="text-xs text-muted-foreground">
              {t.footer.license}
            </span>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {""}
            <a
              href={kproUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-medium"
            >
              <span className="text-foreground group-hover:text-[#1e3a8a] transition-colors">
                K
              </span>
              <span className="text-foreground">PRO</span>
              <span className="text-foreground group-hover:text-[#1e3a8a] transition-colors">
                .tech
              </span>
            </a>
            {" - "}
            <span className="text-foreground">Link2Mpx</span>
            {" "}
            {t.footer.free}
          </p>
        </div>
      </div>
    </footer>
  )
}
