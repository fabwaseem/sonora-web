"use client"

import { motion } from "framer-motion"
import { AccentButton } from "./accent-button"
import { DOWNLOAD_URL } from "./constants"

const REQUIREMENTS = [
  "Windows 10 or Windows 11",
  "Internet for install, models, and updates",
  "Several GB free disk space",
  "NVIDIA GPU recommended (CPU supported)",
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function Download() {
  return (
    <section id="download" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="overflow-hidden rounded-3xl border border-border bg-surface"
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative border-b border-border p-8 md:p-12 lg:border-b-0 lg:border-r">
              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/10 blur-3xl" />
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
                Download
              </p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
                Get Sonora
              </h2>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-muted md:text-base">
                Grab the latest signed Windows installer from GitHub Releases.
                Windows SmartScreen may warn on new builds—confirm the file
                came from the official releases page.
              </p>
              <div className="flex flex-wrap gap-3">
                <AccentButton href={DOWNLOAD_URL} external size="lg">
                  Download for Windows
                  <span aria-hidden>↓</span>
                </AccentButton>
                <AccentButton
                  href={DOWNLOAD_URL}
                  external
                  variant="outline"
                  size="lg"
                >
                  View all releases
                </AccentButton>
              </div>
            </div>

            <div className="bg-inset p-8 md:p-12">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-faint">
                System requirements
              </h3>
              <ul className="space-y-4">
                {REQUIREMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
