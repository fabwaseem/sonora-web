"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { AmbientFieldProps } from "@/components/ui/ambient-field"

const AmbientField = dynamic(
  () => import("@/components/ui/ambient-field").then((m) => m.AmbientField),
  { ssr: false }
)

export function AmbientCanvas({
  className,
  ...props
}: AmbientFieldProps & { className?: string }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  if (reduced) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_65%)]",
          className
        )}
      />
    )
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <AmbientField {...props} />
    </div>
  )
}
