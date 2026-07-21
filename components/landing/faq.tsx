"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    q: "Is Sonora free?",
    a: "Yes. Download the Windows installer from the public releases page and use the studio on your machine.",
  },
  {
    q: "Does my audio leave my computer?",
    a: "During normal use, text, audio, transcriptions, and voices stay local. Internet is only needed for setup downloads, optional models, and update checks.",
  },
  {
    q: "Do I need Python installed?",
    a: "No. Sonora prepares a managed local runtime on first launch—no separate Python installation required.",
  },
  {
    q: "What happens on first launch?",
    a: "A guided setup installs the private runtime and downloads the default speech model (about 350 MB). After that, you can work offline.",
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

const ease = [0.25, 0.1, 0.25, 1] as const

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Common questions
          </h2>
        </motion.div>

        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-fg">{item.q}</span>
                  <span
                    className={cn(
                      "font-mono text-accent-2 transition-transform",
                      isOpen && "rotate-45"
                    )}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
