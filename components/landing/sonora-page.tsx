"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LoadingScreen } from "./loading-screen"
import { Hero } from "./hero"
import { ProductShowcase } from "./product-showcase"
import { Features } from "./features"
import { UseCases } from "./use-cases"
import { Privacy } from "./privacy"
import { StudioModes } from "./studio-modes"
import { Faq } from "./faq"
import { Footer } from "./footer"

export function SonoraPage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <LoadingScreen onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="overflow-x-hidden bg-bg">
          <main className="relative z-10 rounded-b-[1.75rem] bg-bg shadow-[0_24px_80px_rgba(0,0,0,0.65)] md:rounded-b-[2.5rem]">
            <Hero />
            <ProductShowcase />
            <Features />
            <UseCases />
            <Privacy />
            <StudioModes />
            <Faq />
            <div className="h-8 bg-bg md:h-12" aria-hidden />
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}
