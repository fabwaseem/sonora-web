"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { Navbar } from "./navbar"
import { AccentButton } from "./accent-button"
import { WaveformBars } from "./logo-mark"
import { BeamsBackground } from "./beams-background"
import { triggerDownload } from "./constants"

export function Hero() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const targets = gsap.utils.toArray<HTMLElement>([
      ".hero-brand",
      ".hero-line",
      ".hero-cta",
      ".hero-scroll",
    ])

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.out",
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden bg-bg"
    >
      <BeamsBackground
        beamWidth={2.5}
        beamHeight={18}
        beamNumber={15}
        lightColor="#3b82f6"
        speed={2.5}
        noiseIntensity={2}
        scale={0.15}
        rotation={43}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-bg via-bg/25 to-bg/40" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-bg/30 via-transparent to-bg" />

      <Navbar />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:px-10 md:pb-20 md:pt-32">
        <div className="hero-brand mb-8 flex flex-col items-center gap-5 opacity-0 will-change-transform">
          <WaveformBars className="h-10 text-accent" />
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-faint">
            Windows studio
          </p>
          <h1 className="font-display text-[clamp(3.25rem,12vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-fg">
            Sonora
          </h1>
        </div>

        <p className="hero-line mb-4 max-w-xl text-lg font-medium text-fg opacity-0 will-change-transform md:text-2xl">
          Your voice studio, without the cloud.
        </p>
        <p className="hero-line mb-10 max-w-lg text-sm leading-relaxed text-muted opacity-0 will-change-transform md:text-base">
          Create natural speech, transcribe audio, and dictate into any app—all
          privately on your machine.
        </p>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-3 opacity-0 will-change-transform">
          <AccentButton onClick={triggerDownload} size="lg">
            Download for Windows
            <span aria-hidden className="opacity-80">
              ↓
            </span>
          </AccentButton>
          <AccentButton href="#features" variant="outline" size="lg">
            Explore features
          </AccentButton>
        </div>

        <p className="hero-line mt-6 font-mono text-xs text-faint opacity-0 will-change-transform">
          Free · Offline
        </p>
      </div>

      <div className="hero-scroll absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 will-change-transform">
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
