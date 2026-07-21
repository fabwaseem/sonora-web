"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LoadingScreen } from "./loading-screen"
import { Hero } from "./hero"
import { ProductShowcase } from "./product-showcase"
import { Features } from "./features"
import { UseCases } from "./use-cases"
import { Privacy } from "./privacy"
import { HowItWorks } from "./how-it-works"
import { StudioModes } from "./studio-modes"
import { Download } from "./download"
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
            transition={{ duration: 0.45 }}
          >
            <LoadingScreen onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="bg-bg"
        >
          <Hero />
          <ProductShowcase />
          <Features />
          <UseCases />
          <Privacy />
          <HowItWorks />
          <StudioModes />
          <Download />
          <Faq />
          <Footer />
        </motion.main>
      )}
    </>
  )
}
