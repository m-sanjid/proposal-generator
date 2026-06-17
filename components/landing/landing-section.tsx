import { cn } from "@/lib/utils"

interface LandingSectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function LandingSection({
  id,
  children,
  className,
  containerClassName,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-[var(--landing-bg)] py-24 text-[var(--landing-fg)] lg:py-32",
        className,
      )}
    >
      <div className={cn("relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  )
}

interface LandingSectionHeaderProps {
  badge?: string
  title: React.ReactNode
  description?: string
  className?: string
}

export function LandingSectionHeader({
  badge,
  title,
  description,
  className,
}: LandingSectionHeaderProps) {
  return (
    <div className={cn("mb-16 text-center md:mb-20", className)}>
      {badge && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm font-medium text-[var(--landing-muted)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
          {badge}
        </div>
      )}
      <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{title}</h2>
      {description && (
        <p className="mx-auto max-w-2xl text-lg text-[var(--landing-muted)] md:text-xl">{description}</p>
      )}
    </div>
  )
}
