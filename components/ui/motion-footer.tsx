"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUp, Download } from "lucide-react"
import { LogoMark } from "@/components/landing/logo-mark"
import { Magnetic } from "@/components/landing/magnetic"
import {
  triggerDownload,
  ISSUES_URL,
  RELEASES_URL,
} from "@/components/landing/constants"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const MARQUEE = [
  "Private",
  "Offline",
  "Local",
  "Text to speech",
  "Speech to text",
  "Global dictation",
  "Multi-engine",
  "Your booth",
]

function MarqueeTrack() {
  return (
    <div className="flex items-center px-4">
      {MARQUEE.map((item) => (
        <React.Fragment key={item}>
          <span className="px-5">{item}</span>
          <span className="text-accent/70" aria-hidden>
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "12vh", scale: 0.82, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      )

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      ref={wrapperRef}
      className="relative h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-bg text-fg">
        <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[55vh] w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[90px]" />
        <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
        >
          SONORA
        </div>

        <div className="absolute top-10 left-0 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border/60 bg-bg/70 py-3.5 shadow-frost backdrop-blur-md md:top-12">
          <div className="animate-footer-scroll-marquee flex w-max font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted md:text-xs">
            <MarqueeTrack />
            <MarqueeTrack />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-16 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 md:mt-20">
          <div className="mb-6 flex items-center gap-3">
            <LogoMark size={36} />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-faint">
              Studio
            </span>
          </div>

          <h2
            ref={headingRef}
            className="footer-text-glow mb-10 text-center text-4xl font-semibold tracking-tight md:mb-12 md:text-7xl lg:text-8xl"
          >
            Ready for your booth?
          </h2>

          <div
            ref={linksRef}
            className="flex w-full flex-col items-center gap-5"
          >
            <div className="flex w-full flex-wrap justify-center gap-3 md:gap-4">
              <Magnetic
                as="button"
                type="button"
                onClick={triggerDownload}
                className="footer-glass-pill-accent group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold md:px-10 md:py-5 md:text-base"
              >
                <Download className="size-5 opacity-90" strokeWidth={1.75} />
                Download for Windows
              </Magnetic>

              <Magnetic
                as="a"
                href={RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-fg md:px-10 md:py-5 md:text-base"
              >
                View releases
              </Magnetic>
            </div>

            <div className="mt-1 flex w-full flex-wrap justify-center gap-2.5 md:gap-4">
              <Magnetic
                as="a"
                href="#privacy"
                className="footer-glass-pill rounded-full px-5 py-2.5 text-xs font-medium text-muted md:px-6 md:py-3 md:text-sm"
              >
                Privacy
              </Magnetic>
              <Magnetic
                as="a"
                href={ISSUES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill rounded-full px-5 py-2.5 text-xs font-medium text-muted md:px-6 md:py-3 md:text-sm"
              >
                Support
              </Magnetic>
              <Magnetic
                as="a"
                href="#features"
                className="footer-glass-pill rounded-full px-5 py-2.5 text-xs font-medium text-muted md:px-6 md:py-3 md:text-sm"
              >
                Features
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-5 px-6 pb-8 md:flex-row md:gap-6 md:px-12">
          <p className="order-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-faint md:order-1 md:text-xs">
            © {new Date().getFullYear()} Sonora. Local by design.
          </p>

          <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2.5 rounded-full border-border/50 px-5 py-2.5 md:order-2 md:px-6 md:py-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted md:text-xs">
              Available for Windows
            </span>
          </div>

          <Magnetic
            as="button"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="footer-glass-pill group order-3 flex size-12 items-center justify-center rounded-full text-muted hover:text-fg"
          >
            <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </Magnetic>
        </div>
      </footer>
    </div>
  )
}
