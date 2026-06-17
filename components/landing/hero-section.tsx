"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingShapes, AnimatedGrid, ParticlesBackground } from "./floating-elements"
import { AnimatedHeroIllustration } from "./animated-hero-illustration"

const rotatingWords = ["winning", "stunning", "professional", "branded"]

function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block w-[280px] overflow-hidden text-left align-bottom sm:w-[340px] md:w-[400px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 40, opacity: 0, rotateX: -40 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -40, opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="gradient-text-purple absolute left-0"
        >
          {rotatingWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">{rotatingWords[0]}</span>
    </span>
  )
}

function ScrollIndicator() {
  return (
    <motion.button
      type="button"
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      onClick={() => {
        document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })
      }}
    >
      <span className="text-xs tracking-widest text-[var(--landing-muted)] uppercase">Scroll to explore</span>
      <div className="flex h-10 w-6 justify-center rounded-full border-2 border-[var(--landing-border)] pt-2">
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-[var(--landing-accent)]"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.button>
  )
}

function TrustBadges() {
  const badges = [
    { label: "2,500+", desc: "Teams" },
    { label: "50K+", desc: "Proposals" },
    { label: "4.9/5", desc: "Rating" },
  ]

  return (
    <motion.div
      className="mt-12 flex items-center justify-center gap-6 sm:gap-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {badges.map((badge, i) => (
        <React.Fragment key={badge.label}>
          {i > 0 && <div className="h-8 w-px bg-[var(--landing-border)]" />}
          <div className="text-center">
            <div className="text-lg font-bold sm:text-xl">{badge.label}</div>
            <div className="text-xs text-[var(--landing-muted)] sm:text-sm">{badge.desc}</div>
          </div>
        </React.Fragment>
      ))}
    </motion.div>
  )
}

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--landing-bg)]">
      <AnimatedGrid />
      <FloatingShapes />
      <ParticlesBackground />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[var(--landing-muted)]">
              <Sparkles className="h-4 w-4 text-violet-500" />
              <span>Rich text editor & live PDF preview</span>
              <ArrowRight className="h-3 w-3 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Create <RotatingText />
              <br />
              <span className="text-[var(--landing-muted)]">proposals</span>
            </h1>
          </motion.div>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-[var(--landing-muted)] md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ProposalFlow is the{" "}
            <span className="font-medium text-[var(--landing-fg)]">professional proposal platform</span>{" "}
            for modern teams. Create stunning, branded proposals in minutes.
          </motion.p>

          <motion.div
            className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/editor?new=true">
              <Button size="lg" className="h-12 rounded-xl px-8 text-base">
                Start free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-xl px-8 text-base"
              onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="h-4 w-4 fill-current" />
              View demo
            </Button>
          </motion.div>

          <TrustBadges />

          <motion.div
            className="mt-16 sm:mt-20 md:mt-24"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <AnimatedHeroIllustration />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-[var(--landing-bg)] to-transparent" />
    </section>
  )
}
