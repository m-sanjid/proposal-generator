"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
import { FileText, Palette, Send, PenTool } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    description: "Select from our library of professionally designed templates or start from scratch.",
    icon: FileText,
    color: "violet",
  },
  {
    number: "02",
    title: "Customize Content",
    description: "Add your brand, pricing, and project details with our intuitive drag-and-drop editor.",
    icon: Palette,
    color: "blue",
  },
  {
    number: "03",
    title: "Send & Track",
    description: "Share your proposal and track when clients view it. Get notified instantly.",
    icon: Send,
    color: "cyan",
  },
  {
    number: "04",
    title: "Get Signed",
    description: "Clients can accept and sign digitally. You get paid faster with integrated invoicing.",
    icon: PenTool,
    color: "emerald",
  },
]

const colorMap = {
  violet: { bg: "bg-violet-500/20", border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-violet-500/20" },
  blue: { bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-400", glow: "shadow-blue-500/20" },
  cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
  emerald: { bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
}

interface StepCardProps {
  step: typeof steps[0]
  index: number
  isActive: boolean
  onClick: () => void
}

function StepCard({ step, index, isActive, onClick }: StepCardProps) {
  const colors = colorMap[step.color as keyof typeof colorMap]
  const Icon = step.icon

  return (
    <motion.div
      className={`relative cursor-pointer transition-all duration-300 ${isActive ? "z-10" : "z-0"}`}
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="absolute left-8 top-20 hidden h-16 w-px bg-[var(--landing-surface)] md:block" />
      )}

      <motion.div
        className={`group relative flex gap-5 rounded-2xl p-5 transition-all duration-300 border ${isActive
          ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
          : "border-[var(--landing-border)] bg-[var(--landing-accent-soft)] hover:bg-[var(--landing-surface)]"
          }`}
        whileHover={{ scale: 1.02, x: 8 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Step Number / Icon */}
        <motion.div
          className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${isActive ? colors.bg : "bg-[var(--landing-accent-soft)]"
            } border ${isActive ? colors.border : "border-[var(--landing-border)]"} transition-all duration-300`}
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`w-7 h-7 ${isActive ? colors.text : "text-[var(--landing-fg)]/50"} transition-colors`} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-bold ${isActive ? colors.text : "text-[var(--landing-fg)]/30"} transition-colors`}>
              {step.number}
            </span>
            <h3 className={`text-lg font-semibold ${isActive ? "text-[var(--landing-fg)]" : "text-[var(--landing-fg)]/70"} transition-colors truncate`}>
              {step.title}
            </h3>
          </div>
          <p className={`text-sm ${isActive ? "text-[var(--landing-fg)]/70" : "text-[var(--landing-fg)]/40"} transition-colors line-clamp-2`}>
            {step.description}
          </p>
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${colors.bg.replace('/20', '')}`}
            layoutId="activeIndicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// Animated illustration for each step
function StepIllustration({ activeStep }: { activeStep: number }) {
  const step = steps[activeStep]
  const colors = colorMap[step.color as keyof typeof colorMap]

  return (
    <div className="relative h-full min-h-[400px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          className="relative w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main illustration container */}
          <div className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm`}>
            {/* Step-specific animation */}
            {activeStep === 0 && <TemplateAnimation />}
            {activeStep === 1 && <CustomizeAnimation />}
            {activeStep === 2 && <SendAnimation />}
            {activeStep === 3 && <SignAnimation />}
          </div>

          {/* Glow effect */}
          <div className={`absolute -inset-4 ${colors.bg} blur-3xl opacity-30 -z-10`} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Individual step animations
function TemplateAnimation() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/20 rounded-full text-violet-300 text-sm mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Choose Template
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`aspect-[3/4] overflow-hidden rounded-lg border ${i === 1 ? "border-violet-500 bg-violet-500/20" : "border-[var(--landing-border)] bg-[var(--landing-accent-soft)]"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
          >
            <div className="p-2 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded bg-[var(--landing-border)]" />
              <div className="h-1 bg-[var(--landing-surface)] rounded w-full" />
              <div className="h-1 bg-[var(--landing-surface)] rounded w-2/3" />
              <div className="mt-2 h-8 rounded bg-[var(--landing-accent-soft)]" />
            </div>
            {i === 1 && (
              <motion.div
                className="absolute inset-0 border-2 border-violet-500 rounded-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CustomizeAnimation() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[var(--landing-border)] bg-[var(--landing-accent-soft)] p-4">
        {/* Toolbar */}
        <div className="mb-4 flex gap-2 border-b border-[var(--landing-border)] pb-3">
          {["B", "I", "U"].map((t, i) => (
            <motion.div
              key={t}
              className="w-7 h-7 rounded bg-[var(--landing-surface)] flex items-center justify-center text-xs text-[var(--landing-fg)]/70"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {t}
            </motion.div>
          ))}
          <motion.div
            className="ml-auto w-20 h-7 rounded bg-blue-500/30 border border-blue-500/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </div>

        {/* Content being typed */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-4 rounded bg-[var(--landing-border)]"
            initial={{ width: "0%" }}
            animate={{ width: "80%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="h-3 bg-[var(--landing-surface)] rounded"
            initial={{ width: "0%" }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>

        {/* Drag and drop element */}
        <motion.div
          className="mt-4 p-3 rounded-lg border-2 border-dashed border-blue-500/50 bg-blue-500/10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <div className="flex items-center gap-2 text-blue-300 text-sm">
            <Palette className="w-4 h-4" />
            Drag to reorder
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function SendAnimation() {
  return (
    <div className="space-y-4 text-center">
      {/* Document flying animation */}
      <motion.div
        className="relative mx-auto w-20 h-24"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 60, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <div className="h-full w-full rounded-lg border border-[var(--landing-border)] bg-[var(--landing-surface)] flex items-center justify-center">
          <FileText className="w-8 h-8 text-cyan-400" />
        </div>
        {/* Trail effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-cyan-500/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>

      {/* Notification */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        Client viewed proposal
      </motion.div>

      {/* Analytics */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: "Views", value: "12" },
          { label: "Time", value: "4m" },
          { label: "Opens", value: "3" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-lg bg-[var(--landing-accent-soft)] p-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <div className="text-lg font-bold text-[var(--landing-fg)]">{stat.value}</div>
            <div className="text-xs text-[var(--landing-fg)]/50">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SignAnimation() {
  return (
    <div className="space-y-4 text-center">
      {/* Signature box */}
      <div className="rounded-lg border border-[var(--landing-border)] bg-[var(--landing-accent-soft)] p-4">
        <div className="text-xs text-[var(--landing-fg)]/50 mb-2">Sign here</div>
        <div className="h-16 border-2 border-dashed border-emerald-500/50 rounded-lg flex items-center justify-center relative overflow-hidden">
          <motion.svg
            className="w-32 h-10 text-emerald-400"
            viewBox="0 0 128 40"
          >
            <motion.path
              d="M10 30 Q 30 10 50 25 T 90 20 T 118 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </motion.svg>
        </div>
      </div>

      {/* Success message */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-500/20 rounded-xl text-emerald-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.7, type: "spring" }}
        >
          <svg className="w-4 h-4 text-[var(--landing-fg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            />
          </svg>
        </motion.div>
        Proposal Accepted!
      </motion.div>

      {/* Confetti-like particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-emerald-400"
          style={{ left: `${20 + i * 12}%`, top: "50%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-20, -60], opacity: [0, 1, 0], x: (i % 2 ? 10 : -10) }}
          transition={{ delay: 1.6 + i * 0.05, duration: 0.6 }}
        />
      ))}
    </div>
  )
}

export function WorkflowAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(0)

  // Auto-advance steps
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-[var(--landing-bg)] py-24 lg:py-32"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern-subtle" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm font-medium text-[var(--landing-muted)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            HOW IT WORKS
          </motion.div>

          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--landing-fg)]">
            Simple, <span className="gradient-text-purple">yet powerful</span>
          </h2>

          <p className="mx-auto max-w-xl text-lg text-[var(--landing-fg)]/50">
            From template to signed proposal in minutes. Here&apos;s how it works.
          </p>
        </motion.div>

        {/* Main content - 2 column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Steps list */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          {/* Animated illustration */}
          <StepIllustration activeStep={activeStep} />
        </div>

        {/* Progress indicator */}
        <motion.div
          className="mt-16 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${activeStep === index
                ? "w-8 bg-violet-500"
                : "w-2 bg-[var(--landing-border)] hover:bg-[var(--landing-muted)]"
                }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
