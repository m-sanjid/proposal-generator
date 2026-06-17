"use client"

import { motion } from "motion/react"
import { FileText, Plus } from "lucide-react"

interface EmptyStateProps {
  onCreateNew: () => void
}

export function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <motion.div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-neutral-100"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <FileText className="h-12 w-12 text-neutral-400" />
      </motion.div>

      {/* Text */}
      <h3
        className="mb-2 text-2xl font-bold text-neutral-900"
        style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
      >
        No proposals yet
      </h3>
      <p className="mb-8 max-w-sm text-neutral-600">
        Create your first proposal to get started. Choose from our templates or start from scratch.
      </p>

      {/* CTA Button */}
      <motion.button
        onClick={onCreateNew}
        className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="h-5 w-5" />
        Create Your First Proposal
      </motion.button>
    </motion.div>
  )
}
