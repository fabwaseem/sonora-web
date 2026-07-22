"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  Mic,
  AudioLines,
  Keyboard,
  Library,
  Play,
  RefreshCw,
  Terminal,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"

type Feature = {
  id: string
  title: string
  body: string
  icon: LucideIcon
  /** Tailwind span classes for the bento grid */
  span: string
  featured?: boolean
}

const FEATURES: Feature[] = [
  {
    id: "01",
    title: "Text to speech",
    body: "Turn scripts into natural audio with local multi-engine models and a built-in voice library—write once, hear it instantly, export without uploading a file.",
    icon: AudioLines,
    span: "md:col-span-2",
    featured: true,
  },
  {
    id: "02",
    title: "Speech to text",
    body: "Transcribe recordings, video, and mic input on-device with Whisper-family models. Audio stays on your machine.",
    icon: Mic,
    span: "md:col-span-1",
  },
  {
    id: "03",
    title: "Global dictation",
    body: "A hotkey types with your voice into any focused Windows app via a quiet listening overlay.",
    icon: Keyboard,
    span: "md:col-span-1",
  },
  {
    id: "04",
    title: "Local HTTP API",
    body: "Scripts and agents call TTS and STT on localhost:8880—same engines as the booth, with optional API key and OpenAPI docs.",
    icon: Terminal,
    span: "md:col-span-1",
  },
  {
    id: "05",
    title: "Voice library",
    body: "Built-in voices with portraits, custom uploads, library export, and engine switching in one place.",
    icon: Library,
    span: "md:col-span-1",
  },
  {
    id: "06",
    title: "Recents & player",
    body: "Preview takes, revisit cached generations, and keep exports organized inside the booth.",
    icon: Play,
    span: "md:col-span-1",
  },
  {
    id: "07",
    title: "Automatic updates",
    body: "Signed releases land through the app from the public Sonora channel—no hunting for installers.",
    icon: RefreshCw,
    span: "md:col-span-2",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature
  index: number
}) {
  const ref = useRef<HTMLElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const Icon = feature.icon

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: easeOutExpo }}
      viewport={{ once: true, margin: "-40px" }}
      className={cn(
        "group relative flex min-h-[11.5rem] flex-col overflow-hidden bg-bg p-6 md:min-h-[13rem] md:p-7",
        feature.featured && "md:min-h-[15rem] md:justify-end md:p-8",
        feature.span
      )}
    >
      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        className={cn(
          "relative mb-5 flex items-center justify-between",
          feature.featured && "md:mb-auto md:pb-8"
        )}
      >
        <span className="inline-flex size-10 items-center justify-center rounded-[10px] border border-border bg-inset text-accent-2 transition-colors group-hover:border-accent/40 group-hover:bg-accent-soft">
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <span className="font-mono text-[11px] tabular-nums text-faint">
          {feature.id}
        </span>
      </div>

      <h3
        className={cn(
          "relative mb-2 font-semibold tracking-tight text-fg transition-colors group-hover:text-accent-2",
          feature.featured ? "text-xl md:text-2xl" : "text-lg"
        )}
      >
        {feature.title}
      </h3>
      <p
        className={cn(
          "relative leading-relaxed text-muted",
          feature.featured
            ? "max-w-md text-sm md:text-[15px]"
            : "text-sm"
        )}
      >
        {feature.body}
      </p>
    </motion.article>
  )
}

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-bg py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal className="mb-14 max-w-2xl md:mb-16">
          <SectionEyebrow>Capabilities</SectionEyebrow>
          <SectionHeading className="mb-4 text-balance">
            A full speech booth on your desk
          </SectionHeading>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            Generation, transcription, dictation, and a local developer API—in
            one focused Windows app for private voice work.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
