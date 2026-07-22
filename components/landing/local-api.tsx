"use client"

import { motion } from "framer-motion"
import { Reveal, SectionEyebrow, SectionHeading, easeOutExpo } from "./motion"

const CAPABILITIES = [
  {
    title: "Same booth, HTTP",
    body: "While Sonora runs, scripts and AI agents hit the same TTS and STT surface as the desktop UI on port 8880.",
  },
  {
    title: "Key when you need it",
    body: "Require a key for LAN clients, keep loopback open for the studio, and rotate anytime from Settings → API.",
  },
  {
    title: "Docs on demand",
    body: "Toggle built-in /docs, /redoc, and openapi.json. Set CORS for your tools, then restart once.",
  },
]

export function LocalApi() {
  return (
    <section id="api" className="relative overflow-hidden bg-bg py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_48%)]" />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal className="mb-10 max-w-2xl md:mb-14">
          <SectionEyebrow>Local HTTP API</SectionEyebrow>
          <SectionHeading className="mb-4 text-balance">
            Wire your tools into the booth
          </SectionHeading>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            While Sonora is open, a FastAPI surface listens on{" "}
            <span className="font-mono text-[0.95em] text-accent-2">
              127.0.0.1:8880
            </span>
            —synthesize, transcribe, and manage engines from scripts or agents.
            Full route catalog, curl examples, and access controls live in the
            app under Settings → API.
          </p>
        </Reveal>

        <div className="grid gap-8 border-t border-border pt-8 md:grid-cols-3 md:gap-10 md:pt-10">
          {CAPABILITIES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: easeOutExpo,
              }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight text-fg">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
