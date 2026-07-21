"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { LogoMark } from "./logo-mark"
import { AccentButton } from "./accent-button"
import { DOWNLOAD_URL, ISSUES_URL, RELEASES_URL } from "./constants"

export function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        duration: 36,
        ease: "none",
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="overflow-hidden border-t border-border bg-bg pt-16 md:pt-20">
      <div className="overflow-hidden pb-12 md:pb-16">
        <div
          ref={marqueeRef}
          className="flex w-max whitespace-nowrap text-4xl font-semibold tracking-tight text-fg/15 md:text-6xl lg:text-7xl"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="pr-8">
              PRIVATE · OFFLINE · LOCAL ·
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 pb-10 md:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <LogoMark size={40} />
              <div>
                <p className="text-lg font-semibold text-fg">Sonora</p>
                <p className="font-mono text-xs text-faint">Studio</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              A private, fully offline speech studio for Windows. Built for
              local voice creation.
            </p>
          </div>
          <AccentButton href={DOWNLOAD_URL} external size="lg">
            Download for Windows
          </AccentButton>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-5">
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-fg"
            >
              Releases
            </a>
            <a
              href={ISSUES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-fg"
            >
              Support
            </a>
            <a
              href="#privacy"
              className="text-xs uppercase tracking-[0.18em] text-faint transition-colors hover:text-fg"
            >
              Privacy
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Available for Windows
          </div>
        </div>
      </div>
    </footer>
  )
}
