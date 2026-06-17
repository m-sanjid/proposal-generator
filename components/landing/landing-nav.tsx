"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import ThemeToggle from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
]

export function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-b border-[var(--landing-border)] bg-[var(--landing-bg)]/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-fg)]"
              >
                {link.label}
                <motion.span
                  className="absolute inset-0 -z-10 rounded-lg bg-[var(--landing-accent-soft)]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: hoveredLink === link.href ? 1 : 0,
                    scale: hoveredLink === link.href ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-fg)]"
            >
              Log in
            </Link>
            <ThemeToggle />
            <Link href="/editor?new=true">
              <Button size="sm" className="rounded-full gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-[var(--landing-muted)] transition-colors hover:bg-[var(--landing-accent-soft)] hover:text-[var(--landing-fg)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-[var(--landing-border)] bg-[var(--landing-bg)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block border-b border-[var(--landing-border)] py-3 text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-fg)]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="space-y-3 pt-4">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-xl border border-[var(--landing-border)] py-3 text-center text-[var(--landing-muted)]"
                >
                  Log in
                </Link>
                <Link
                  href="/editor?new=true"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-xl bg-primary py-3 text-center font-semibold text-primary-foreground"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
