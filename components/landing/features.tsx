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
} from "lucide-react"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"

const FEATURES = [
  {
    id: "01",
    title: "Text to speech",
    body: "Turn scripts into natural audio with local speech models and a built-in voice library—write once, hear it instantly, export without uploading a file.",
    icon: AudioLines,
  },
  {
    id: "02",
    title: "Speech to text",
    body: "Transcribe recordings and mic input on-device with Whisper-family models. Your audio never leaves the machine.",
    icon: Mic,
  },
  {
    id: "03",
    title: "Global dictation",
    body: "A configurable hotkey types with your voice into any focused Windows app—email, docs, chat—via a quiet listening overlay.",
    icon: Keyboard,
  },
  {
    id: "04",
    title: "Voice library",
    body: "Browse built-in voices, switch engines, and add compatible custom samples so the studio sounds like you.",
    icon: Library,
  },
  {
    id: "05",
    title: "Integrated player",
    body: "Preview takes, manage recents, and keep generated speech organized inside the same booth you create in.",
    icon: Play,
  },
  {
    id: "06",
    title: "Automatic updates",
    body: "Signed releases land through the app from the public Sonora releases channel—no hunting for installers.",
    icon: RefreshCw,
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number]
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
    x.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    y.set(((e.clientY - r.top) / r.height - 0.5) * 12)
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: easeOutExpo }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative overflow-hidden bg-bg p-7 md:p-8"
    >
      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-inset text-accent-2 transition-colors group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent-2">
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <span className="font-mono text-xs text-faint">{feature.id}</span>
      </div>
      <h3 className="mb-3 text-lg font-semibold text-fg transition-colors group-hover:text-accent-2">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{feature.body}</p>
    </motion.article>
  )
}

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-bg py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <SectionEyebrow>Capabilities</SectionEyebrow>
          <SectionHeading className="mb-4">
            A full speech booth on your desk
          </SectionHeading>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            Sonora brings generation, transcription, and dictation together in
            one focused Windows app—built for private, local voice work.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
