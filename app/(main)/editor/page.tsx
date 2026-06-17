"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Save, Check } from "lucide-react"

import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { DocumentPreview } from "@/components/preview/document-preview"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    <div className="relative min-h-[calc(100vh-4rem)] bg-muted/30">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
        <header className="sticky top-16 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden lg:block">
                <BreadcrumbLink href="/dashboard" className="text-xs">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden lg:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">
                  {currentProposal ? "Edit Proposal" : "New Proposal"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <TabsList variant="line" className="h-8">
            <TabsTrigger value="form" className="px-3 text-xs font-medium uppercase">
              Form
            </TabsTrigger>
            <TabsTrigger value="preview" className="px-3 text-xs font-medium uppercase">
              Preview
            </TabsTrigger>
            {!isMobile && (
              <TabsTrigger value="both" className="px-3 text-xs font-medium uppercase">
                Both
              </TabsTrigger>
            )}
          </TabsList>

          <div className="flex-1" />

          <div className="hidden items-center gap-3 sm:flex">
            <Input
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
              placeholder={invoiceData.documentTitle || "Untitled Proposal"}
              className="h-8 w-44 bg-muted/40 text-sm lg:w-56"
            />
          </div>

          <Button onClick={handleSave} disabled={isSaving} size="sm">
            {showSaved ? (
              <>
                <Check />
                <span className="hidden lg:inline">Saved</span>
              </>
            ) : (
              <>
                <Save />
                <span className="hidden lg:inline">{isSaving ? "Saving..." : "Save"}</span>
              </>
            )}
          </Button>
        </header>

        <div className="flex-1 p-4">
          <TabsContent value="form">
            <EditorSidebar className="rounded-2xl" />
          </TabsContent>
          {!isMobile && (
            <TabsContent value="both" className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
              <div className="lg:col-span-1">
                <EditorSidebar className="max-h-[calc(100vh-8rem)] overflow-auto rounded-l-2xl" />
              </div>
              <div className="lg:col-span-2 max-h-[calc(100vh-8rem)] overflow-auto">
                <DocumentPreview className="rounded-r-2xl" />
              </div>
            </TabsContent>
          )}

          <TabsContent value="preview">
            <DocumentPreview className="rounded-2xl ml-0" />
          </TabsContent>
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
          <div className="flex min-h-screen items-center justify-center bg-muted/30">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
              <p className="text-sm text-muted-foreground">Loading editor...</p>
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
