"use client"

import { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion"
import { Reveal, SectionEyebrow, easeOutExpo } from "./motion"

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.94, 1, 0.98])

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(59,130,246,0.18), transparent 55%)`

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((py - 0.5) * -8)
    rotateY.set((px - 0.5) * 10)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  return (
    <section ref={sectionRef} className="relative bg-bg pb-10 pt-2 md:pb-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-12">
        <Reveal className="mb-8 text-center md:mb-10">
          <SectionEyebrow className="mb-3">Inside the booth</SectionEyebrow>
          <p className="mx-auto max-w-lg text-sm text-muted md:text-base">
            A focused workspace for generation, transcription, voices, and a
            local API—designed to feel like a private studio, not a cloud
            dashboard.
          </p>
        </Reveal>

        <motion.div style={{ y, scale }} className="perspective-[1200px]">
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-frost md:rounded-3xl"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 mix-blend-screen"
              style={{ background: glare }}
            />
            <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-border/80 bg-inset/80 px-4 py-3 backdrop-blur-sm">
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="ml-3 font-mono text-[11px] text-faint">
                Sonora Studio
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-success">
                <span className="size-1.5 rounded-full bg-success" />
                Local
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/preview.jpg"
              alt="Sonora speech studio interface with text-to-speech workspace"
              className="mt-10 block w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
