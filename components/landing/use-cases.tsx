"use client"

import { motion } from "framer-motion"

const USE_CASES = [
  {
    title: "Voiceovers without the upload",
    body: "Draft narration, hear it locally, and export studio audio for videos, courses, and demos—without sending scripts to a hosted TTS API.",
  },
  {
    title: "Transcripts that stay private",
    body: "Turn interviews, meetings, and recordings into text on-device when cloud transcription is off the table.",
  },
  {
    title: "Dictate anywhere on Windows",
    body: "Hold your hotkey and speak into the focused field—mail, docs, chat—while Sonora injects text from a quiet overlay.",
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function UseCases() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
            Built for
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-fg md:text-5xl">
            Creators who want voice tools that never leave the booth
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {USE_CASES.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: i * 0.08, ease }}
              viewport={{ once: true, margin: "-40px" }}
              className="grid gap-4 rounded-2xl border border-border bg-surface/50 p-6 transition-colors hover:bg-surface md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10 md:p-8"
            >
              <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
