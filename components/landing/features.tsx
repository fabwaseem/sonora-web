"use client"

import { motion } from "framer-motion"

const FEATURES = [
  {
    id: "01",
    title: "Text to speech",
    body: "Turn scripts into natural audio with local speech models and a built-in voice library—write once, hear it instantly, export without uploading a file.",
  },
  {
    id: "02",
    title: "Speech to text",
    body: "Transcribe recordings and mic input on-device with Whisper-family models. Your audio never leaves the machine.",
  },
  {
    id: "03",
    title: "Global dictation",
    body: "A configurable hotkey types with your voice into any focused Windows app—email, docs, chat—via a quiet listening overlay.",
  },
  {
    id: "04",
    title: "Voice library",
    body: "Browse built-in voices, switch engines, and add compatible custom samples so the studio sounds like you.",
  },
  {
    id: "05",
    title: "Integrated player",
    body: "Preview takes, manage recents, and keep generated speech organized inside the same booth you create in.",
  },
  {
    id: "06",
    title: "Automatic updates",
    body: "Signed releases land through the app from the public Sonora releases channel—no hunting for installers.",
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function Features() {
  return (
    <section id="features" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 max-w-2xl md:mb-20"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
            Capabilities
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-fg md:text-5xl">
            A full speech booth on your desk
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            Sonora brings generation, transcription, and dictation together in
            one focused Windows app—built for private, local voice work.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease }}
              viewport={{ once: true, margin: "-40px" }}
              className="group bg-bg p-7 transition-colors hover:bg-surface md:p-8"
            >
              <span className="mb-6 block font-mono text-xs text-faint">
                {feature.id}
              </span>
              <h3 className="mb-3 text-lg font-semibold text-fg transition-colors group-hover:text-accent-2">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{feature.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
