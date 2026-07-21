import { Manrope, JetBrains_Mono } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { cn } from "@/lib/utils"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

// Display shares Manrope — Sonora's booth uses one sans family with weight contrast.

export const metadata: Metadata = {
  title: "Sonora — Private offline speech studio for Windows",
  description:
    "Create natural speech, transcribe audio, and dictate into any app—all on your machine. Fully offline TTS, STT, and global dictation.",
  openGraph: {
    title: "Sonora — Your voice studio, without the cloud",
    description:
      "A private, fully offline speech studio for Windows. Text-to-speech, speech-to-text, and global dictation on your machine.",
    images: ["/images/preview.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark antialiased",
        manrope.variable,
        jetbrainsMono.variable,
        "font-sans"
      )}
    >
      <body
        className="bg-bg text-fg"
        style={
          {
            "--font-display": "var(--font-sans)",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  )
}
