"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Twitter, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Editor", href: "/editor?new=true" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Workflow", href: "#workflow" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "mailto:hello@proposalflow.com" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@proposalflow.com", label: "Email" },
]

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-[var(--landing-fg)]">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-fg)]"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3 translate-x-1 -translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Newsletter() {
  return (
    <div className="max-w-sm">
      <h3 className="mb-4 text-sm font-semibold text-[var(--landing-fg)]">Stay updated</h3>
      <p className="mb-4 text-sm text-[var(--landing-muted)]">
        Get the latest updates on new features and product releases.
      </p>
      <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <Input type="email" placeholder="Enter your email" className="flex-1" />
        <Button type="submit" size="sm">
          Subscribe
        </Button>
      </form>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--landing-border)] bg-[var(--landing-bg)]">
      <div className="absolute inset-0 grid-pattern-subtle opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-6 lg:gap-12">
          <div className="col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="mb-6 max-w-xs text-sm text-[var(--landing-muted)]">
              The professional proposal platform for modern teams. Create stunning proposals in minutes.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--landing-border)] bg-[var(--landing-surface)] text-[var(--landing-muted)] transition-all hover:border-[var(--landing-accent)] hover:text-[var(--landing-fg)]"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <FooterColumn title="Product" links={footerLinks.product} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <div className="col-span-2 md:col-span-1">
            <FooterColumn title="Legal" links={footerLinks.legal} />
          </div>
        </div>

        <div className="border-t border-[var(--landing-border)] py-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <Newsletter />
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-sm text-emerald-600 dark:text-emerald-400">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--landing-border)] py-6 sm:flex-row">
          <p className="text-sm text-[var(--landing-muted)]">
            © {new Date().getFullYear()} ProposalFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-fg)]">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-fg)]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
