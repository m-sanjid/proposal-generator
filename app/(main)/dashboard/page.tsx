"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { LayoutGrid, List } from "lucide-react"
import Link from "next/link"
import { ProposalCard } from "@/components/dashboard/proposal-card"
import { TemplatePicker } from "@/components/dashboard/template-picker"
import { EmptyState } from "@/components/dashboard/empty-state"
import {
  getAllProposals,
  deleteProposal,
  duplicateProposal,
  SavedProposal,
} from "@/lib/storage-utils"
import { Template } from "@/lib/templates"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function DashboardContent() {
  const router = useRouter()
  const [proposals, setProposals] = useState<SavedProposal[]>([])
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)

  // Load proposals on mount
  useEffect(() => {
    setProposals(getAllProposals())
    setIsLoading(false)
  }, [])

  const handleEdit = (id: string) => {
    router.push(`/editor?id=${id}`)
  }

  const handleDuplicate = (id: string) => {
    const duplicated = duplicateProposal(id)
    if (duplicated) {
      setProposals(getAllProposals())
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      deleteProposal(id)
      setProposals(getAllProposals())
    }
  }

  const handleSelectTemplate = (template: Template) => {
    sessionStorage.setItem("newProposalTemplate", JSON.stringify(template.data))
    setShowTemplatePicker(false)
    router.push("/editor?new=true")
  }

  return (
    <div className="relative">
      {/* Dashboard Header - matches editor style */}
      <header className="sticky top-16 z-30 border-b backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center gap-2 h-14 px-4 shrink-0">

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Proposal Count */}
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-sm text-neutral-500">
              {proposals.length > 0
                ? `${proposals.length} proposal${proposals.length !== 1 ? "s" : ""}`
                : "No proposals yet"}
            </span>
          </div>

          {/* View Toggle */}
          <div className="hidden md:flex items-center gap-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-2 transition-colors ${viewMode === "grid"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-md p-2 transition-colors ${viewMode === "list"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 max-w-7xl mx-auto min-h-[calc(100vh-11rem)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white" />
              <p className="text-sm text-neutral-500">Loading proposals...</p>
            </div>
          </div>
        ) : proposals.length === 0 ? (
          <EmptyState onCreateNew={() => setShowTemplatePicker(true)} />
        ) : (
          <motion.div
            className={`grid gap-4 sm:gap-6 ${viewMode === "grid"
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Template Picker Modal */}
      <AnimatePresence>
        {showTemplatePicker && (
          <TemplatePicker
            onSelect={handleSelectTemplate}
            onClose={() => setShowTemplatePicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DashboardPage() {
  return <DashboardContent />
}
