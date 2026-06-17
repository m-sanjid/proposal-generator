"use client"

import { motion, AnimatePresence } from "motion/react"
import { templates, blankTemplate, Template } from "@/lib/templates"
import { X, FileText, Sparkles, ArrowRight } from "lucide-react"

interface TemplatePickerProps {
  onSelect: (template: Template) => void
  onClose: () => void
}

// Category colors for visual distinction
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  consulting: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  agency: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
  technical: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  saas: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
}

export function TemplatePicker({ onSelect, onClose }: TemplatePickerProps) {
  const allTemplates = [blankTemplate, ...templates]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 sm:px-8 sm:py-5">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 sm:text-2xl">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Choose a Template
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Start with a professionally designed template or create from scratch
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Template Grid */}
          <div className="flex-1 overflow-auto p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allTemplates.map((template, index) => {
                const colors = categoryColors[template.category] || categoryColors.consulting
                const isBlank = template.id === "blank"

                return (
                  <motion.button
                    key={template.id}
                    onClick={() => onSelect(template)}
                    className={`group relative flex flex-col overflow-hidden rounded-xl border-2 bg-white p-5 text-left transition-all duration-200 hover:shadow-lg ${isBlank
                        ? "border-dashed border-neutral-300 hover:border-neutral-400"
                        : `${colors.border} hover:border-neutral-400`
                      }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon/Thumbnail */}
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${isBlank ? "bg-neutral-100" : colors.bg
                        }`}
                    >
                      {isBlank ? (
                        <FileText className="h-6 w-6 text-neutral-400" />
                      ) : (
                        template.thumbnail
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-neutral-900 group-hover:text-neutral-700">
                        {template.name}
                      </h3>
                      <p className="text-sm text-neutral-500 line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Category Badge */}
                    {!isBlank && (
                      <div className="mt-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors.bg} ${colors.text}`}
                        >
                          {template.category}
                        </span>
                      </div>
                    )}

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-200 group-hover:opacity-100">
                      <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>

                    {/* Subtle gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${isBlank
                          ? "bg-gradient-to-br from-neutral-50/50 to-transparent"
                          : `bg-gradient-to-br ${colors.bg.replace("bg-", "from-")}/30 to-transparent`
                        } pointer-events-none`}
                    />
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-4 sm:px-8">
            <p className="text-center text-sm text-neutral-500">
              All templates are fully customizable after selection
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
