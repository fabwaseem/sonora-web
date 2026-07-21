"use client"

import { motion } from "framer-motion"

const MODES = [
  { label: "Text to speech", detail: "Generate · Recents · Voices" },
  { label: "Speech to text", detail: "Audio · Video · Mic" },
  { label: "Dictation", detail: "Global hotkey · Overlay" },
  { label: "Settings", detail: "Window · Tray · Updates" },
]

const ENGINES = [
  "Kokoro",
  "VibeVoice",
  "Chatterbox",
  "OmniVoice",
  "VoxCPM",
  "Qwen",
  "Whisper",
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function StudioModes() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
              Studio modes
            </p>
            <h2 className="mb-8 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              One sidebar. Four focused rooms.
            </h2>
            <ul className="space-y-3">
              {MODES.map((mode) => (
                <li
                  key={mode.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4"
                >
                  <span className="font-medium text-fg">{mode.label}</span>
                  <span className="font-mono text-xs text-faint">
                    {mode.detail}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
              Local engines
            </p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              Multi-engine by design
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted md:text-base">
              Swap open-source TTS engines and Whisper-family ASR models as your
              work demands—GPU-accelerated when available, CPU-capable when not.
            </p>
            <div className="flex flex-wrap gap-2">
              {ENGINES.map((engine) => (
                <span
                  key={engine}
                  className="rounded-full border border-border bg-inset px-4 py-2 font-mono text-xs text-muted"
                >
                  {engine}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
