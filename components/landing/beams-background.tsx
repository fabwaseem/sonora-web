"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { BeamsProps } from "@/components/ui/ethereal-beams"

const Beams = dynamic(
  () => import("@/components/ui/ethereal-beams").then((m) => m.Beams),
  { ssr: false, loading: () => null }
)

export function BeamsBackground(props: BeamsProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_70%)]" />
    )
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Soft static glow so the hero never feels empty while WebGL boots */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_70%)]"
        initial={{ opacity: 0.45 }}
        animate={{ opacity: sceneReady ? 0.2 : 0.55 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: sceneReady ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Beams
          {...props}
          onReady={() => {
            requestAnimationFrame(() => setSceneReady(true))
          }}
        />
      </motion.div>
    </div>
  )
}
