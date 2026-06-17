"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

// ============================================================================
// STEPS DATA
// ============================================================================

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    description: "Select from our library of professionally designed templates or start from scratch.",
  },
  {
    number: "02",
    title: "Customize Content",
    description: "Add your brand, pricing, and project details with our intuitive drag-and-drop editor.",
  },
  {
    number: "03",
    title: "Send & Track",
    description: "Share your proposal and track when clients view it. Get notified instantly.",
  },
  {
    number: "04",
    title: "Get Signed",
    description: "Clients can accept and sign digitally. You get paid faster with integrated invoicing.",
  },
]

// ============================================================================
// STEP CARD
// ============================================================================

interface StepCardProps {
  step: (typeof steps)[0]
  index: number
}

function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="absolute left-8 top-16 hidden h-full w-px bg-gradient-to-b from-neutral-300 dark:from-neutral-600 to-transparent md:block" />
      )}

      <motion.div
        className="group relative flex gap-6 rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-6 transition-all duration-300"
        whileHover={{ scale: 1.02, x: 8 }}
      >
        {/* Step Number */}
        <div className="flex-shrink-0">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-lg shadow-lg"
            whileHover={{ rotate: 5 }}
          >
            {step.number}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            {step.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// MAIN SECTION
// ============================================================================

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950"
      ref={ref}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20" strokeLinecap="round" />
            </svg>
            HOW IT WORKS
          </motion.div>

          <h2
            className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Simple, <span className="italic opacity-50">yet powerful</span>
          </h2>

          <p className="mx-auto max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
            From template to signed proposal in minutes. Here&apos;s how it works.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-xl transition-all shadow-lg hover:shadow-xl">
            Start Creating
            <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
