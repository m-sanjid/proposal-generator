"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Check, Eye, LayoutPanelTop, PenSquare, Save } from "lucide-react"

import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { DocumentPreview } from "@/components/preview/document-preview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useInvoice } from "@/context/invoice-context"
import { getProposal, saveProposal, updateProposal, type SavedProposal } from "@/lib/storage-utils"
import { SidebarInset, useSidebar } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const VIEW_OPTIONS = [
  {
    value: "form",
    label: "Editor",
    detail: "Fields",
    icon: PenSquare,
  },
  {
    value: "preview",
    label: "Preview",
    detail: "Document",
    icon: Eye,
  },
  {
    value: "both",
    label: "Split",
    detail: "Workspace",
    icon: LayoutPanelTop,
  },
] as const

function EditorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { invoiceData, loadProposal } = useInvoice()

  const [currentProposal, setCurrentProposal] = useState<SavedProposal | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [proposalName, setProposalName] = useState("")
  const [activeTab, setActiveTab] = useState<string>("form")

  const isMobile = useIsMobile()
  const { setOpen } = useSidebar()

  const proposalId = searchParams.get("id")
  const isNew = searchParams.get("new") === "true"

  useEffect(() => {
    if (isMobile === undefined) return

    if (isMobile && activeTab === "both") {
      setActiveTab("form")
    } else if (!isMobile && activeTab === "form") {
      setActiveTab("both")
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile === undefined) return

    if (!isMobile && activeTab === "both") {
      setOpen(false)
    }
  }, [activeTab, isMobile, setOpen])

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
        } catch (error) {
          console.error("Failed to parse template data:", error)
        }
      }
    }
  }, [proposalId, isNew, loadProposal])

  useEffect(() => {
    if (!showSaved) return

    const timer = window.setTimeout(() => setShowSaved(false), 2000)
    return () => window.clearTimeout(timer)
  }, [showSaved])

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
    } finally {
      setIsSaving(false)
    }
  }

  const viewOptions = isMobile ? VIEW_OPTIONS.filter((option) => option.value !== "both") : VIEW_OPTIONS

  return (
    <div className="editor-app relative min-h-[calc(100vh-3.5rem)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col gap-0">
        <section className="px-4 pb-2.5 pt-3 sm:px-5 lg:px-6">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-2.5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden lg:block">
                  <BreadcrumbLink href="/dashboard" className="text-xs text-muted-foreground">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden lg:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-xs text-foreground/80">
                    {currentProposal ? "Edit proposal" : "New proposal"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-balance text-[1.55rem] font-semibold tracking-[-0.04em] text-foreground sm:text-[1.7rem]">
                    {proposalName || invoiceData.documentTitle || "Untitled Proposal"}
                  </h1>
                  <span className="inline-flex min-h-8 items-center rounded-full border border-border/60 bg-background/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground tabular-nums">
                    {invoiceData.documentNumber || "Draft"}
                  </span>
                </div>
                <p className="mt-1 max-w-xl text-pretty text-sm leading-6 text-muted-foreground">
                  Edit the proposal on the left and keep the live document visible while you work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <header className="editor-chrome sticky top-14 z-30 border-y border-white/40 px-4 py-2 backdrop-blur-xl sm:px-5 lg:px-6">
          <div className="mx-auto grid w-full max-w-[1500px] gap-2.5 lg:grid-cols-[auto_minmax(220px,320px)_auto] lg:items-center lg:justify-between">
            <div className="inline-flex w-full max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-white/40 bg-background/78 p-1.5 shadow-sm lg:w-auto">
              {viewOptions.map((option) => {
                const Icon = option.icon
                const isActive = activeTab === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setActiveTab(option.value)}
                    className={cn(
                      "group relative inline-flex min-h-9 min-w-24 items-center gap-2 rounded-2xl px-3 py-2 text-left transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.96]",
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : "bg-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    )}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-background/12 text-current">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="grid">
                      <span className="text-[13px] font-semibold leading-none">{option.label}</span>
                      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-current/70">
                        {option.detail}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <Input
              value={proposalName}
              onChange={(event) => setProposalName(event.target.value)}
              placeholder={invoiceData.documentTitle || "Untitled Proposal"}
              className="h-9 rounded-2xl border-white/50 bg-background/82 px-4 text-sm shadow-sm"
            />

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving} className="h-9 rounded-2xl px-4 shadow-sm">
                <span className="relative inline-flex h-4 w-4 items-center justify-center">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={showSaved ? "saved" : isSaving ? "saving" : "save"}
                      initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {showSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="state-slot inline-grid min-w-22 text-center">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={showSaved ? "saved-label" : isSaving ? "saving-label" : "save-label"}
                      initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                      className="col-start-1 row-start-1"
                    >
                      {showSaved ? "Saved" : isSaving ? "Saving..." : "Save draft"}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 pb-4 pt-2 sm:px-5 sm:pb-5 lg:px-6">
          <div className="mx-auto w-full max-w-[1500px]">
            <TabsContent value="form" className="m-0">
              <div className="mx-auto max-w-5xl">
                <EditorSidebar className="min-h-[calc(100vh-10rem)]" />
              </div>
            </TabsContent>

            {!isMobile && (
              <TabsContent value="both" className="m-0">
                <div className="grid gap-4 lg:grid-cols-2">
                  <EditorSidebar className="min-h-[calc(100vh-10rem)] lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)]" />
                  <div className="editor-panel min-h-[calc(100vh-10rem)] overflow-hidden rounded-[24px] p-2.5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)]">
                    <DocumentPreview compact className="h-full rounded-[22px]" />
                  </div>
                </div>
              </TabsContent>
            )}

            <TabsContent value="preview" className="m-0">
              <div className="editor-panel min-h-[calc(100vh-10rem)] overflow-hidden rounded-[24px] p-2.5">
                <DocumentPreview compact className="h-full rounded-[22px]" />
              </div>
            </TabsContent>
          </div>
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
          <div className="editor-app flex min-h-screen items-center justify-center px-4">
            <div className="editor-panel flex min-h-[220px] w-full max-w-md flex-col items-center justify-center rounded-[24px] p-8 text-center">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-muted border-t-primary" />
              <p className="mt-4 text-balance text-base font-medium text-foreground">Loading editor…</p>
              <p className="mt-1 text-sm text-muted-foreground">Preparing your proposal workspace.</p>
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
  return <EditorPageInner />
}
