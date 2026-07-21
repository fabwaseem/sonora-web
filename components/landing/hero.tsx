"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { Navbar } from "./navbar"
import { AccentButton } from "./accent-button"
import { WaveformBars } from "./logo-mark"
import { DOWNLOAD_URL } from "./constants"

export function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.fromTo(
        ".hero-brand",
        { opacity: 0, y: 36, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 }
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.55"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_45%)] animate-glow-breathe" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:px-10 md:pb-20 md:pt-32">
        <div className="hero-brand mb-8 flex flex-col items-center gap-5">
          <WaveformBars className="h-10 text-accent" />
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-faint">
            Windows studio
          </p>
          <h1 className="font-display text-[clamp(3.25rem,12vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-fg">
            Sonora
          </h1>
        </div>

        <p className="hero-line mb-4 max-w-xl text-lg font-medium text-fg md:text-2xl">
          Your voice studio, without the cloud.
        </p>
        <p className="hero-line mb-10 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          Create natural speech, transcribe audio, and dictate into any app—all
          privately on your machine.
        </p>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-3">
          <AccentButton href={DOWNLOAD_URL} external size="lg">
            Download for Windows
            <span aria-hidden className="opacity-80">
              ↓
            </span>
          </AccentButton>
          <AccentButton href="#features" variant="outline" size="lg">
            Explore features
          </AccentButton>
        </div>

        <p className="hero-line mt-6 font-mono text-xs text-faint">
          Free · Offline
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Scroll
        </span>
        <div className="relative h-9 w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 h-1/2 bg-accent animate-scroll-hint" />
        </div>
      </div>
    </section>
  )
}
