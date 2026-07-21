import { cn } from "@/lib/utils"

type AccentButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "solid" | "ghost" | "outline"
  className?: string
  size?: "md" | "lg" | "sm"
  external?: boolean
}

export function AccentButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  size = "md",
  external,
}: AccentButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-3 text-sm",
    size === "lg" && "px-8 py-3.5 text-base",
    variant === "solid" &&
      "bg-accent text-accent-ink hover:bg-accent-2 shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_40%,transparent),0_8px_28px_color-mix(in_srgb,var(--accent)_25%,transparent)] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-2)_50%,transparent),0_10px_36px_color-mix(in_srgb,var(--accent)_35%,transparent)]",
    variant === "outline" &&
      "border border-border bg-surface/60 text-fg backdrop-blur-md hover:border-border-strong hover:bg-surface-2",
    variant === "ghost" && "text-muted hover:bg-surface hover:text-fg",
    className
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
