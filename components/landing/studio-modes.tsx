"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"

const MODES = [
  {
    label: "Text to speech",
    detail: "Generate · Recents · Voices",
    blurb:
      "Write a script, pick a voice, and render natural speech with multi-engine local models.",
  },
  {
    label: "Speech to text",
    detail: "Audio · Video · Mic",
    blurb:
      "Drop in recordings or capture from the mic—Whisper-family models transcribe on your machine.",
  },
  {
    label: "Dictation",
    detail: "Global hotkey · Overlay",
    blurb:
      "Speak into any focused Windows field. Sonora listens privately and types for you.",
  },
  {
    label: "Settings",
    detail: "Window · Tray · Updates",
    blurb:
      "Tune the booth—window behavior, tray, hotkeys, and signed automatic updates.",
  },
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

export function StudioModes() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative overflow-hidden bg-bg py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_50%)]" />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionEyebrow>Studio modes</SectionEyebrow>
              <SectionHeading className="mb-8">
                One sidebar. Four focused rooms.
              </SectionHeading>
            </Reveal>

            <ul className="space-y-2">
              {MODES.map((mode, i) => (
                <motion.li
                  key={mode.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.55, ease: easeOutExpo }}
                  viewport={{ once: true }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                      active === i
                        ? "border-accent/40 bg-accent-soft"
                        : "border-border bg-surface hover:border-border-strong"
                    }`}
                  >
                    <span className="font-medium text-fg">{mode.label}</span>
                    <span className="font-mono text-xs text-faint">
                      {mode.detail}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-5 text-sm leading-relaxed text-muted"
              >
                {MODES[active].blurb}
              </motion.p>
            </AnimatePresence>
          </div>

          <Reveal delay={0.1}>
            <SectionEyebrow>Local engines</SectionEyebrow>
            <SectionHeading className="mb-4 md:text-4xl">
              Multi-engine by design
            </SectionHeading>
            <p className="mb-8 text-sm leading-relaxed text-muted md:text-base">
              Swap open-source TTS engines and Whisper-family ASR models as your
              work demands—GPU-accelerated when available, CPU-capable when not.
            </p>
            <div className="flex flex-wrap gap-2">
              {ENGINES.map((engine, i) => (
                <motion.span
                  key={engine}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.06,
                    backgroundColor: "rgba(59,130,246,0.12)",
                    borderColor: "rgba(59,130,246,0.45)",
                  }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="cursor-default rounded-full border border-border bg-inset px-4 py-2 font-mono text-xs text-muted"
                >
                  {engine}
                </motion.span>
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-inset p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  Active mode
                </span>
                <span className="size-2 rounded-full bg-accent animate-pulse-dot" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  <p className="mb-2 text-2xl font-semibold text-fg">
                    {MODES[active].label}
                  </p>
                  <p className="font-mono text-xs text-accent-2">
                    {MODES[active].detail}
                  </p>
                  <div className="mt-6 flex h-16 items-end gap-1">
                    {Array.from({ length: 24 }).map((_, bar) => (
                      <motion.span
                        key={bar}
                        className="flex-1 rounded-full bg-accent/70"
                        animate={{
                          height: [
                            `${20 + ((bar * 17) % 60)}%`,
                            `${40 + ((bar * 29) % 50)}%`,
                            `${20 + ((bar * 17) % 60)}%`,
                          ],
                        }}
                        transition={{
                          duration: 1.2 + (bar % 5) * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
