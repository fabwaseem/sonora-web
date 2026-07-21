"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LogoMark, WaveformBars } from "./logo-mark"

const WORDS = ["Private", "Offline", "Local"]
const DURATION_MS = 300

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 120)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length)
    }, 450)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 flex items-center gap-3 md:top-10 md:left-10"
      >
        <LogoMark size={28} />
        <span className="text-xs font-medium tracking-[0.28em] text-faint uppercase">
          Studio
        </span>
      </motion.div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <WaveformBars className="h-12 scale-125" />
        <AnimatePresence mode="wait">
          <motion.p
            key={WORDS[wordIndex]}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="font-display text-4xl font-semibold tracking-tight text-fg/90 md:text-6xl"
          >
            {WORDS[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute right-6 bottom-10 font-mono text-5xl text-fg tabular-nums md:right-10 md:bottom-14 md:text-7xl">
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-border">
        <div
          className="h-full origin-left bg-accent"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow:
              "0 0 12px color-mix(in srgb, var(--accent) 45%, transparent)",
          }}
        />
      </div>
    </div>
  )
}
