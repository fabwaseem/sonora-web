import { cn } from "@/lib/utils"

type LogoMarkProps = {
  className?: string
  size?: number
}

export function LogoMark({ className, size = 40 }: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.svg"
      alt="Sonora"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
    />
  )
}

export function WaveformBars({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex h-8 items-end justify-center gap-1.5", className)}
      aria-hidden
    >
      {[0.55, 0.9, 1, 0.75, 0.5].map((h, i) => (
        <span
          key={i}
          className="w-1.5 origin-bottom rounded-full bg-accent animate-waveform"
          style={{
            height: `${h * 100}%`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  )
}
