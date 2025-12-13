"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "motion/react"
import { Save, Check, ChevronLeft, Download, Eye } from "lucide-react"
import Link from "next/link"

import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { DocumentPreview } from "@/components/preview/document-preview"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import { useInvoice } from "@/context/invoice-context"
import { getProposal, saveProposal, updateProposal, SavedProposal } from "@/lib/storage-utils"
import { SidebarInset } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useIsMobile } from "@/hooks/use-mobile"

function EditorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { invoiceData, loadProposal } = useInvoice()

  const [currentProposal, setCurrentProposal] = useState<SavedProposal | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [proposalName, setProposalName] = useState("")
  const [activeTab, setActiveTab] = useState<string>("form") // Start with form to avoid hydration mismatch

  const isMobile = useIsMobile()

  const proposalId = searchParams.get("id")
  const isNew = searchParams.get("new") === "true"

  // Handle tab switching based on screen size
  useEffect(() => {
    if (isMobile === undefined) return // Wait for hook to initialize

    if (isMobile && activeTab === "both") {
      // On mobile, switch from "both" to "form"
      setActiveTab("form")
    } else if (!isMobile && activeTab === "form") {
      // On desktop, default to "both" view (only on initial load)
      setActiveTab("both")
    }
  }, [isMobile]) // Only run when isMobile changes

  // Load proposal data on mount
  useEffect(() => {
    if (proposalId) {
      const proposal = getProposal(proposalId)
      if (proposal) {
        setCurrentProposal(proposal)
        setProposalName(proposal.name)
        loadProposal(proposal.data)
      }
    } else if (isNew) {
      const templateData = sessionStorage.getItem("newProposalTemplate")
      if (templateData) {
        try {
          const data = JSON.parse(templateData)
          loadProposal(data)
          sessionStorage.removeItem("newProposalTemplate")
        } catch (e) {
          console.error("Failed to parse template data:", e)
        }
      }
    }
  }, [proposalId, isNew, loadProposal])

  const handleSave = async () => {
    setIsSaving(true)
    const name = proposalName || invoiceData.documentTitle || "Untitled Proposal"

    try {
      if (currentProposal) {
        const updated = updateProposal(currentProposal.id, { name, data: invoiceData })
        if (updated) setCurrentProposal(updated)
      } else {
        const saved = saveProposal({ name, data: invoiceData })
        setCurrentProposal(saved)
        router.replace(`/editor?id=${saved.id}`)
      }
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="relative">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col relative">
        {/* Editor Header with Sidebar Trigger */}
        <header className="sticky top-16 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-xl">

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden lg:block">
                <BreadcrumbLink>
                  <Link href="/dashboard" className="text-xs tracking-tight">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden lg:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs tracking-tight">
                  {currentProposal ? "Edit Proposal" : "New Proposal"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* Editor Tabs */}
          <TabsList>
            <TabsTab value="form" className="text-xs tracking-tight font-semibold uppercase">
              Form
            </TabsTab>
            <TabsTab value="preview" className="text-xs tracking-tight font-semibold uppercase">
              Preview
            </TabsTab>
            {!isMobile && (
              <TabsTab value="both" className="text-xs tracking-tight font-semibold uppercase">Both</TabsTab>
            )}
          </TabsList>
          {/* Spacer */}
          <div className="flex-1" />


          {/* Proposal Name */}
          <div className="hidden items-center gap-3 sm:flex">
            <input
              type="text"
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
              placeholder={invoiceData.documentTitle || "Untitled Proposal"}
              className="lg:w-48 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/5"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              layout
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showSaved ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="hidden lg:inline">Saved</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span className="hidden lg:inline">{isSaving ? "Saving..." : "Save"}</span>
                </>
              )}
            </motion.button>
          </div>
        </header>

        <div className="flex-1 p-4">
          <TabsPanel value="form">
            <EditorSidebar className="rounded-2xl" />
          </TabsPanel>
          {!isMobile && (
            <TabsPanel value="both" className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
              <div className="lg:col-span-1">
                <EditorSidebar className="max-h-[calc(100vh-8rem)] overflow-auto rounded-l-2xl" />
              </div>
              <div className="lg:col-span-2 max-h-[calc(100vh-8rem)] overflow-auto">
                <DocumentPreview className="rounded-r-2xl" />
              </div>
            </TabsPanel>
          )}

          <TabsPanel value="preview">
            <DocumentPreview className="rounded-2xl ml-0" />
          </TabsPanel>
        </div>
      </Tabs>
    </div>
  )
}

function EditorPageInner() {
  return (
    <Suspense
      fallback={
        <SidebarInset>
          <div className="flex min-h-screen items-center justify-center bg-neutral-50">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" />
              <p className="text-sm text-neutral-500">Loading editor...</p>
            </div>
          </div>
        </SidebarInset>
      }
    >
      <EditorContent />
    </Suspense>
  )
}

export default function EditorPage() {
  return (
    <EditorPageInner />
  )
}
