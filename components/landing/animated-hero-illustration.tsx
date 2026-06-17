"use client"

import { motion } from "motion/react"

export function AnimatedHeroIllustration() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main document mockup */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface)] shadow-2xl shadow-violet-500/10"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Browser header */}
        <div className="flex items-center gap-2 border-b border-[var(--landing-border)] bg-[var(--landing-accent-soft)] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex flex-1 justify-center">
            <div className="rounded-lg bg-[var(--landing-surface)] px-4 py-1 text-xs text-[var(--landing-muted)]">
              proposalflow.app/editor
            </div>
          </div>
        </div>

        {/* Editor content */}
        <div className="p-6 min-h-[400px] relative">
          {/* Sidebar mockup */}
          <motion.div
            className="absolute top-6 left-6 w-48 space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="h-8 rounded-lg bg-[var(--landing-accent-soft)]" />
            <div className="h-6 w-3/4 rounded-lg bg-[var(--landing-accent-soft)]" />
            <div className="h-6 w-1/2 rounded-lg bg-[var(--landing-accent-soft)]" />
            <div className="mt-6 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="flex h-10 items-center gap-2 rounded-lg bg-[var(--landing-accent-soft)] px-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                >
                  <div className="w-4 h-4 rounded bg-violet-500/30" />
                  <div className="h-2 flex-1 rounded bg-[var(--landing-border)]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Document preview mockup */}
          <motion.div
            className="ml-56 bg-white rounded-xl p-8 shadow-xl min-h-[350px] relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Header block */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <div className="h-6 w-48 bg-gray-900 rounded mb-2" />
              <div className="h-3 w-32 bg-gray-300 rounded" />
            </motion.div>

            {/* Content blocks - animated typing */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {/* Animated content lines */}
              {[100, 80, 90, 70, 85].map((width, i) => (
                <motion.div
                  key={i}
                  className="h-3 bg-gray-200 rounded"
                  style={{ width: `${width}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + i * 0.15, ease: "easeOut" }}
                />
              ))}
            </motion.div>

            {/* Animated cursor */}
            <motion.div
              className="absolute w-4 h-6 bg-violet-500/80 rounded-sm"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [200, 250, 320, 320],
                y: [150, 150, 180, 180]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />

            {/* Pricing table mockup */}
            <motion.div
              className="mt-8 border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <div className="bg-gray-100 px-4 py-2">
                <div className="h-3 w-20 bg-gray-400 rounded" />
              </div>
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 2.0 + i * 0.1 }}
                  >
                    <div className="h-3 w-24 bg-gray-300 rounded" />
                    <div className="h-3 w-16 bg-gray-400 rounded" />
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <div className="h-4 w-16 bg-gray-500 rounded" />
                  <div className="h-4 w-20 bg-violet-500 rounded" />
                </div>
              </div>
            </motion.div>

            {/* Signature section */}
            <motion.div
              className="mt-6 pt-4 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <motion.svg
                    className="w-20 h-6 text-gray-400"
                    viewBox="0 0 80 24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 2.6 }}
                  >
                    <motion.path
                      d="M5 18 Q 15 5 25 15 T 45 12 T 65 15 T 75 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 2.6 }}
                    />
                  </motion.svg>
                </div>
                <motion.div
                  className="px-4 py-2 bg-green-500 text-white text-xs font-medium rounded-lg flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 3.2, type: "spring" }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Signed
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating action elements */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            <div className="rounded-lg bg-violet-500 px-3 py-1.5 text-xs font-medium text-white">
              Export PDF
            </div>
            <div className="rounded-lg border border-[var(--landing-border)] bg-[var(--landing-surface)] px-3 py-1.5 text-xs text-[var(--landing-muted)]">
              Share
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Glow effects */}
      <div className="absolute -inset-4 bg-violet-500/20 blur-3xl rounded-full opacity-50 -z-10" />
      <div className="absolute -inset-8 bg-purple-500/10 blur-3xl rounded-full opacity-30 -z-20" />
    </div>
  )
}
