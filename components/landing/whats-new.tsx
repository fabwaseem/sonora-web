"use client"

import { motion } from "framer-motion"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"
import { AccentButton } from "./accent-button"
import { RELEASES_URL } from "./constants"

const UPDATES = [
  {
    tag: "API",
    title: "Local HTTP API for TTS & STT",
    body: "Call synthesize, transcribe, dictate, engines, and voices from scripts or AI agents while Sonora runs. API key, CORS, and OpenAPI docs are managed in Settings.",
  },
  {
    tag: "Studio",
    title: "Guided onboarding & multi-model setup",
    body: "Pick TTS and STT models up front, download with per-model progress, set your dictation hotkey, then drop into a quieter studio with smoother mode transitions.",
  },
  {
    tag: "Engines",
    title: "Six local TTS engines + Whisper family",
    body: "Kokoro, VibeVoice, Chatterbox, OmniVoice, VoxCPM, and Qwen—plus Tiny through Large v3 Whisper models. Switch, download, or install from the booth or the API.",
  },
  {
    tag: "Voices",
    title: "Library, uploads, and export",
    body: "Built-in library voices with portraits, custom sample uploads, reference transcripts, and a one-shot voice library export for backups.",
  },
]

export function WhatsNew() {
  return (
    <section id="updates" className="relative overflow-hidden bg-bg py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionEyebrow>What&apos;s new</SectionEyebrow>
            <SectionHeading className="mb-4">
              The booth keeps getting sharper
            </SectionHeading>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              Recent Sonora releases deepen the local studio—developer access,
              multi-engine control, and a cleaner first-run path—without leaving
              your machine.
            </p>
          </div>
          <AccentButton
            href={RELEASES_URL}
            external
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            All releases
          </AccentButton>
        </Reveal>

        <ol className="relative space-y-0 border-l border-border pl-6 md:pl-8">
          {UPDATES.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.65,
                delay: i * 0.06,
                ease: easeOutExpo,
              }}
              viewport={{ once: true, margin: "-40px" }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[1.65rem] top-1.5 size-2.5 rounded-full border border-accent/50 bg-accent md:-left-[2.15rem]" />
              <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-accent-2">
                {item.tag}
              </span>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-fg md:text-xl">
                {item.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
