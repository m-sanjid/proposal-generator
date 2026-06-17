import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showWordmark?: boolean
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-105">
        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      </div>
      {showWordmark && (
        <span className="text-xl font-bold text-[var(--landing-fg)]">
          Proposal<span className="text-violet-500 dark:text-violet-400">Flow</span>
        </span>
      )}
    </Link>
  )
}
