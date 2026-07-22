"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { AmbientCanvas } from "./ambient-canvas"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"
import { AccentButton } from "./accent-button"
import { ISSUES_URL, triggerDownload } from "./constants"

const FAQS = [
  {
    q: "Is Sonora free?",
    a: "Yes. Download the Windows installer from the public releases page and use the studio on your machine.",
  },
  {
    q: "Does my audio leave my computer?",
    a: "During normal use, text, audio, transcriptions, and voices stay local—including requests through the local HTTP API. Internet is only needed for setup downloads, optional models, and update checks.",
  },
  {
    q: "Is there a developer API?",
    a: "Yes. While Sonora is running, a FastAPI server listens on http://127.0.0.1:8880 for TTS, STT, voices, engines, and cache. Configure API keys, CORS, and OpenAPI docs under Settings → API. Loopback can stay key-free so the studio keeps working.",
  },
  {
    q: "Do I need Python installed?",
    a: "No. Sonora prepares a managed local runtime on first launch—no separate Python installation required.",
  },
  {
    q: "What happens on first launch?",
    a: "A guided setup installs the private runtime, then onboarding lets you choose TTS and STT models (with download progress), set a dictation hotkey, and enter the studio. After models are installed, you can work offline.",
  },
  {
    q: "Which engines and models are included?",
    a: "TTS: Kokoro, VibeVoice, Chatterbox, OmniVoice, VoxCPM, and Qwen (one active at a time). STT: Whisper-family sizes from Tiny through Large v3. Download or install what you need from the app or the API.",
  },
  {
    q: "Can I use Sonora without a GPU?",
    a: "Yes. An NVIDIA GPU is recommended for faster processing, but CPU operation is supported.",
  },
  {
    q: "Windows SmartScreen blocked the installer. Is that expected?",
    a: "New builds can trigger SmartScreen. Confirm the installer came from the official Sonora releases repository before continuing.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-bg py-20 md:py-28">
      <AmbientCanvas mode="particles" className="opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />

      <div className="relative z-10 mx-auto max-w-[960px] px-6 md:px-10">
        <Reveal className="mb-12 md:mb-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionEyebrow>FAQ</SectionEyebrow>
              <SectionHeading>Common questions</SectionHeading>
              <p className="mt-3 max-w-md text-sm text-muted">
                Quick answers about privacy, setup, the local API, and running
                Sonora on your machine.
              </p>
            </div>
            <AccentButton
              href={ISSUES_URL}
              external
              variant="outline"
              size="sm"
              className="shrink-0"
            >
              Ask support
            </AccentButton>
          </div>
        </Reveal>

        <div className="overflow-hidden rounded-3xl border border-border bg-surface/40 shadow-frost backdrop-blur-xl">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.45,
                  ease: easeOutExpo,
                }}
                viewport={{ once: true }}
                className={cn(
                  "border-b border-border/80 last:border-b-0 transition-colors",
                  isOpen && "bg-accent-soft/40"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left md:gap-6 md:px-7 md:py-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "font-mono text-xs tabular-nums transition-colors",
                      isOpen ? "text-accent-2" : "text-faint"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-medium text-fg md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all",
                      isOpen
                        ? "border-accent/40 bg-accent-soft text-accent-2"
                        : "border-border bg-inset text-muted"
                    )}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-mono text-lg leading-none"
                    >
                      +
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 pl-[3.25rem] text-sm leading-relaxed text-muted md:px-7 md:pl-[4.25rem] md:pr-16">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-inset/60 px-5 py-5 backdrop-blur-md sm:flex-row sm:items-center md:px-7">
            <div>
              <p className="text-sm font-semibold text-fg">
                Ready to try the booth?
              </p>
              <p className="mt-1 text-sm text-muted">
                Download the latest signed installer and set up in minutes.
              </p>
            </div>
            <AccentButton onClick={triggerDownload} size="md">
              Download for Windows
            </AccentButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
