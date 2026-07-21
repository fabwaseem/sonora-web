"use client"

import { motion, type MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeOutQuart = [0.25, 0.1, 0.25, 1] as const

type RevealProps = MotionProps & {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-2",
        className
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-tight text-fg md:text-5xl",
        className
      )}
    >
      {children}
    </h2>
  )
}
