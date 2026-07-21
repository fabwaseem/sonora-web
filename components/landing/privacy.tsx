"use client"

import { motion } from "framer-motion"

const PILLARS = [
  {
    title: "Stays on your machine",
    body: "Scripts, recordings, transcriptions, voice samples, and generated audio remain local during normal use.",
  },
  {
    title: "Offline",
    body: "Once models are installed, speech generation and recognition work without a cloud round-trip.",
  },
  {
    title: "Network only when needed",
    body: "Internet is used for first-run setup, optional model downloads, and signed update checks—nothing else.",
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function Privacy() {
  return (
    <section id="privacy" className="relative overflow-hidden bg-bg py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
              Privacy
            </p>
            <h2 className="mb-5 text-3xl font-semibold tracking-tight text-fg md:text-5xl">
              Built for private, local voice creation
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Sonora runs a managed local runtime on your PC. There is no hosted
              inference path for your day-to-day studio work—your booth stays
              yours.
            </p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                viewport={{ once: true, margin: "-40px" }}
                className="border-l-2 border-accent/60 pl-5"
              >
                <h3 className="mb-1.5 text-base font-semibold text-fg">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
