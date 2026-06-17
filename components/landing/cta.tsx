"use client"

import React from "react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingElement } from "./floating-elements"

export const CTA = () => {
  const ctaRef = React.useRef(null)
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={ctaRef}
      className="relative overflow-hidden bg-[var(--landing-bg)] py-24 lg:py-32"
    >
      <div className="absolute inset-0 grid-pattern-subtle" />

      <FloatingElement
        className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl"
        delay={0}
        duration={8}
      >
        <div />
      </FloatingElement>
      <FloatingElement
        className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl"
        delay={2}
        duration={10}
      >
        <div />
      </FloatingElement>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            className="glass-card mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--landing-muted)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isCtaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-violet-500" />
            <span>Join 2,500+ teams already winning</span>
          </motion.div>

          <motion.h2
            className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Ready to win <span className="gradient-text-purple">more clients</span>?
          </motion.h2>

          <motion.p
            className="mx-auto mb-12 max-w-xl text-lg text-[var(--landing-muted)] md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Join thousands of professionals who create stunning proposals with ProposalFlow. No credit
            card required.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Link href="/editor?new=true">
              <Button size="lg" className="h-12 rounded-xl px-8">
                Start Creating Proposals
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="h-12 rounded-xl px-8">
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-[var(--landing-muted)]"
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            {["Free to start", "No credit card required", "Export PDF instantly"].map((text, i) => (
              <motion.div
                key={text}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[var(--landing-border)] to-transparent" />
    </section>
  )
}
