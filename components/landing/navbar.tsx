"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LogoMark } from "./logo-mark"
import { AccentButton } from "./accent-button"
import { DOWNLOAD_URL, NAV_LINKS } from "./constants"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("Features")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  const go = (href: string, label: string) => {
    setActive(label)
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-50 w-full max-w-3xl">
        <nav
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-full border border-border bg-surface/80 px-2 py-2 backdrop-blur-xl transition-shadow",
            scrolled && "shadow-frost"
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              go("#home", "Features")
            }}
            className="flex items-center gap-2.5 rounded-full py-1 pl-1.5 pr-3"
          >
            <LogoMark size={32} />
            <span className="text-sm font-semibold tracking-tight text-fg">
              Sonora
            </span>
          </a>

          <div className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.href, link.label)
                }}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active === link.label
                    ? "bg-inset text-fg"
                    : "text-muted hover:text-fg"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <AccentButton
              href={DOWNLOAD_URL}
              external
              size="sm"
              className="hidden shrink-0 md:inline-flex"
            >
              Download
            </AccentButton>

            <button
              type="button"
              className="relative flex size-10 items-center justify-center rounded-full border border-border bg-inset text-fg transition-colors hover:bg-surface-2 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block size-4">
                <motion.span
                  className="absolute left-0 top-[3px] h-[1.5px] w-4 rounded-full bg-fg"
                  animate={
                    menuOpen
                      ? { top: "7px", rotate: 45 }
                      : { top: "3px", rotate: 0 }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute left-0 top-[7px] h-[1.5px] w-4 rounded-full bg-fg"
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 top-[11px] h-[1.5px] w-4 rounded-full bg-fg"
                  animate={
                    menuOpen
                      ? { top: "7px", rotate: -45 }
                      : { top: "11px", rotate: 0 }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-3xl border border-border bg-surface/95 shadow-frost backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col p-3">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{
                      delay: 0.04 + i * 0.05,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      go(link.href, link.label)
                    }}
                    className={cn(
                      "rounded-2xl px-4 py-3.5 text-base font-medium transition-colors",
                      active === link.label
                        ? "bg-inset text-fg"
                        : "text-muted hover:bg-inset/60 hover:text-fg"
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.22, duration: 0.3 }}
                  className="mt-2 border-t border-border pt-3"
                >
                  <AccentButton
                    href={DOWNLOAD_URL}
                    external
                    size="md"
                    className="w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Download for Windows
                  </AccentButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
