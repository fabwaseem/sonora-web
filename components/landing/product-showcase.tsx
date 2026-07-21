"use client"

import { motion } from "framer-motion"

const ease = [0.25, 0.1, 0.25, 1] as const

export function ProductShowcase() {
  return (
    <section className="relative bg-bg pb-8 pt-4 md:pb-12">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-frost md:rounded-3xl"
        >
          <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-border/80 bg-inset/80 px-4 py-3 backdrop-blur-sm">
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="size-2.5 rounded-full bg-border-strong" />
            <span className="ml-3 font-mono text-[11px] text-faint">
              Sonora Studio
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/preview.jpg"
            alt="Sonora speech studio interface with text-to-speech workspace"
            className="mt-10 block w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
