"use client"

import { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { Shield, WifiOff, GlobeLock, Lock } from "lucide-react"
import { AmbientCanvas } from "./ambient-canvas"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"

const PILLARS = [
  {
    n: "01",
    title: "Stays on your machine",
    body: "Scripts, recordings, transcriptions, voice samples, generated audio, and local API traffic remain on your PC during normal use.",
    icon: Shield,
    signal: "On-device",
  },
  {
    n: "02",
    title: "Offline",
    body: "Once models are installed, speech generation and recognition work without a cloud round-trip—UI and localhost API alike.",
    icon: WifiOff,
    signal: "No uplink",
  },
  {
    n: "03",
    title: "Network only when needed",
    body: "Internet is used for first-run setup, optional model downloads, and signed update checks—nothing else.",
    icon: GlobeLock,
    signal: "Opt-in only",
  },
]

function VaultCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number]
  index: number
}) {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 22 })
  const y = useSpring(my, { stiffness: 180, damping: 22 })
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent) 18%, transparent), transparent 55%)`
  const Icon = pillar.icon

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: easeOutExpo }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-md md:p-7"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-accent-2 shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
          <Icon className="size-5" strokeWidth={1.6} />
        </span>
        <span className="font-mono text-[11px] text-faint">{pillar.n}</span>
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-fg">
        {pillar.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted">
        {pillar.body}
      </p>
      <div className="relative mt-5 flex items-center gap-2 border-t border-border/70 pt-4">
        <span className="size-1.5 rounded-full bg-success" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          {pillar.signal}
        </span>
      </div>
    </motion.article>
  )
}

export function Privacy() {
  return (
    <section
      id="privacy"
      className="relative overflow-hidden bg-bg py-20 md:py-28"
    >
      <AmbientCanvas mode="particles" className="opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/75 to-bg" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-6 md:px-10">
        <div className="mb-12 grid items-end gap-8 lg:mb-16 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <SectionEyebrow>Privacy</SectionEyebrow>
            <SectionHeading className="max-w-xl">
              Built for private, local voice creation
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-inset/80 p-5 backdrop-blur-md lg:justify-self-end lg:p-6">
              <div className="mb-3 flex items-center gap-2">
                <Lock className="size-3.5 text-accent-2" strokeWidth={1.75} />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                  Booth seal
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Managed local runtime. No hosted inference for day-to-day studio
                work—your booth stays yours.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {PILLARS.map((pillar, i) => (
            <VaultCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl border border-border bg-surface/30 px-5 py-4 sm:flex-row sm:items-center md:px-7">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50" />
                <span className="relative inline-flex size-2.5 rounded-full bg-success" />
              </span>
              <p className="text-sm text-fg">
                Processing stays on your PC during normal use
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["TTS", "STT", "Dictation", "API", "Voices"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-inset px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
