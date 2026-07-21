"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

export type MagneticProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: "button" | "a"
    strength?: number
  }

export const Magnetic = React.forwardRef<HTMLElement, MagneticProps>(
  (
    { className, children, as = "button", strength = 0.35, ...props },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLElement>(null)

    useEffect(() => {
      const element = localRef.current
      if (!element) return

      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      if (mq.matches) return

      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(element, {
            x: x * strength,
            y: y * strength,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          })
        }

        const onLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.35)",
            duration: 1.1,
          })
        }

        element.addEventListener("mousemove", onMove)
        element.addEventListener("mouseleave", onLeave)
        return () => {
          element.removeEventListener("mousemove", onMove)
          element.removeEventListener("mouseleave", onLeave)
        }
      }, element)

      return () => ctx.revert()
    }, [strength])

    const Comp = as

    return (
      <Comp
        ref={(node: HTMLElement | null) => {
          ;(localRef as React.MutableRefObject<HTMLElement | null>).current =
            node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
              node
        }}
        className={cn("cursor-pointer will-change-transform", className)}
        style={{ transformStyle: "preserve-3d" }}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </Comp>
    )
  }
)
Magnetic.displayName = "Magnetic"
