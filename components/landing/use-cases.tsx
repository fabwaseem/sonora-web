"use client"

import { motion } from "framer-motion"
import { Film, FileText, MessageSquare, Bot } from "lucide-react"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"

const USE_CASES = [
  {
    title: "Voiceovers without the upload",
    body: "Draft narration, hear it locally, and export studio audio for videos, courses, and demos—without sending scripts to a hosted TTS API.",
    icon: Film,
    accent: "from-accent/20 to-transparent",
  },
  {
    title: "Transcripts that stay private",
    body: "Turn interviews, meetings, and recordings into text on-device when cloud transcription is off the table.",
    icon: FileText,
    accent: "from-accent-2/15 to-transparent",
  },
  {
    title: "Dictate anywhere on Windows",
    body: "Hold your hotkey and speak into the focused field—mail, docs, chat—while Sonora injects text from a quiet overlay.",
    icon: MessageSquare,
    accent: "from-accent/25 to-transparent",
  },
  {
    title: "Automate with local agents",
    body: "Point scripts, n8n, Cursor, or custom tools at localhost:8880 to synthesize and transcribe with the same engines as the UI—no cloud TTS bill.",
    icon: Bot,
    accent: "from-accent/20 to-transparent",
  },
]

export function UseCases() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal className="mb-12 md:mb-16">
          <SectionEyebrow>Built for</SectionEyebrow>
          <SectionHeading className="max-w-2xl">
            Creators who want voice tools that never leave the booth
          </SectionHeading>
        </Reveal>

        <div className="flex flex-col gap-4 md:gap-5">
          {USE_CASES.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: easeOutExpo }}
                viewport={{ once: true, margin: "-40px" }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 md:p-8"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative grid gap-5 md:grid-cols-[auto_minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-10">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-inset text-accent-2">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    {item.body}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
