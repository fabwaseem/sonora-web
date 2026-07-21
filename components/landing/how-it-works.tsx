"use client"

import { motion } from "framer-motion"

const STEPS = [
  {
    n: "01",
    title: "Install the studio",
    body: "Download the Windows setup, run the installer, and launch Sonora. No separate Python install required.",
  },
  {
    n: "02",
    title: "Guided first-run setup",
    body: "Sonora prepares a private local runtime and downloads the default speech model (~350 MB). Setup time depends on your connection.",
  },
  {
    n: "03",
    title: "Create offline",
    body: "Generate speech, transcribe audio, or dictate into other apps—processing stays on your machine after setup.",
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function HowItWorks() {
  return (
    <section id="how" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 md:mb-16"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
            Setup
          </p>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-fg md:text-5xl">
            From download to first take in minutes
          </h2>
        </motion.div>

        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: i * 0.1, ease }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative"
            >
              <span className="mb-6 block font-mono text-4xl font-medium text-accent/40 md:text-5xl">
                {step.n}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-fg">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-8 hidden h-px w-1/3 bg-gradient-to-r from-border to-transparent md:block lg:w-1/2" />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
