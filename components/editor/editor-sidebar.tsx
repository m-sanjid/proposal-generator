"use client"

import React, { useState, useRef, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTab } from "@/components/ui/tabs"
import { DownloadMenu } from "@/components/editor/download-menu"
import { useInvoice } from "@/context/invoice-context"

// Import modular panel components
import {
  DetailsPanel,
  ExecutiveSummaryPanel,
  ScopeOfWorkPanel,
  TimelinePanel,
  FinancialBreakdownPanel,
  TermsPanel,
  NotesPanel,
  AcceptancePanel,
  SettingsPanel,
  BrandingPanel,
} from "./panels"
import { cn } from "@/lib/utils"

// Tab configuration for scalability
const TABS = [
  { value: "details", label: "Details" },
  { value: "sections", label: "Sections" },
  { value: "settings", label: "Settings" },
  { value: "branding", label: "Brand" },
] as const

type TabValue = (typeof TABS)[number]["value"]

export function EditorSidebar({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TabValue>("details")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get all context values
  const {
    invoiceData,
    updateSender,
    updateRecipient,
    updateDocumentInfo,
    updateBranding,
    addItem,
    updateItem,
    removeItem,
    updateTaxRate,
    updateDiscountAmount,
    updateExecutiveSummary,
    updateScopeOfWork,
    addPhase,
    updatePhase,
    removePhase,
    addExclusion,
    updateExclusion,
    removeExclusion,
    updateTimeline,
    addMilestone,
    updateMilestone,
    removeMilestone,
    updateTermsConditions,
    addTerm,
    updateTerm,
    removeTerm,
    updateAcceptance,
    addNote,
    updateNote,
    removeNote,
    toggleSection,
    updateSectionLabel,
    isSectionEnabled,
    isSectionEmpty,
    getSectionLabel,
  } = useInvoice()

  // Logo upload handler
  const handleLogoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          updateBranding({ logo: reader.result as string })
        }
        reader.readAsDataURL(file)
      }
    },
    [updateBranding]
  )

  // Section clear handlers - memoized for performance
  const clearHandlers = {
    executiveSummary: useCallback(() => {
      updateExecutiveSummary({ objective: "", solution: "" })
      toggleSection("executiveSummary", false)
    }, [updateExecutiveSummary, toggleSection]),

    scopeOfWork: useCallback(() => {
      updateScopeOfWork({ phases: [], exclusions: [] })
      toggleSection("scopeOfWork", false)
    }, [updateScopeOfWork, toggleSection]),

    timeline: useCallback(() => {
      updateTimeline({ startDate: "", estimatedDuration: "", milestones: [] })
      toggleSection("timeline", false)
    }, [updateTimeline, toggleSection]),

    termsConditions: useCallback(() => {
      updateTermsConditions({ terms: [], additionalTerms: "" })
      toggleSection("termsConditions", false)
    }, [updateTermsConditions, toggleSection]),

    notes: useCallback(() => {
      invoiceData.notes.forEach((note) => removeNote(note.id))
      toggleSection("notes", false)
    }, [invoiceData.notes, removeNote, toggleSection]),

    acceptance: useCallback(() => {
      updateAcceptance({ clientName: "", signatureDate: "", showSignatureLine: false })
      toggleSection("acceptance", false)
    }, [updateAcceptance, toggleSection]),
  }

  // Shared section props for DRY code
  const baseSectionProps = {
    getSectionLabel,
    isSectionEnabled,
    isSectionEmpty,
    toggleSection,
    updateSectionLabel,
  }

  return (
    <div className={cn("flex h-full scrollbar-hide flex-col bg-card no-print border w-full max-w-2xl", className)}>
      {/* Tabs Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <TabsList className="mx-4 mt-4">
          {TABS.map((tab) => (
            <TabsTab key={tab.value} value={tab.value} className="text-xs">
              {tab.label}
            </TabsTab>
          ))}
        </TabsList>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 border-t">
          {/* Details Tab */}
          <TabsContent value="details" className="m-0 space-y-6">
            <DetailsPanel
              invoiceData={invoiceData}
              updateDocumentInfo={updateDocumentInfo}
              updateSender={updateSender}
              updateRecipient={updateRecipient}
            />
          </TabsContent>

          {/* Sections Tab */}
          <TabsContent value="sections" className="m-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              Toggle sections on/off, edit titles, and manage content.
              Click the pencil icon to rename any section.
            </p>

            <ExecutiveSummaryPanel
              invoiceData={invoiceData}
              updateExecutiveSummary={updateExecutiveSummary}
              onClear={clearHandlers.executiveSummary}
              {...baseSectionProps}
            />

            <ScopeOfWorkPanel
              invoiceData={invoiceData}
              addPhase={addPhase}
              updatePhase={updatePhase}
              removePhase={removePhase}
              addExclusion={addExclusion}
              updateExclusion={updateExclusion}
              removeExclusion={removeExclusion}
              onClear={clearHandlers.scopeOfWork}
              {...baseSectionProps}
            />

            <TimelinePanel
              invoiceData={invoiceData}
              updateTimeline={updateTimeline}
              addMilestone={addMilestone}
              updateMilestone={updateMilestone}
              removeMilestone={removeMilestone}
              onClear={clearHandlers.timeline}
              {...baseSectionProps}
            />

            <FinancialBreakdownPanel
              invoiceData={invoiceData}
              addItem={addItem}
              updateItem={updateItem}
              removeItem={removeItem}
              updateTaxRate={updateTaxRate}
              updateDiscountAmount={updateDiscountAmount}
              {...baseSectionProps}
            />

            <TermsPanel
              invoiceData={invoiceData}
              addTerm={addTerm}
              updateTerm={updateTerm}
              removeTerm={removeTerm}
              updateTermsConditions={updateTermsConditions}
              onClear={clearHandlers.termsConditions}
              {...baseSectionProps}
            />

            <NotesPanel
              invoiceData={invoiceData}
              addNote={addNote}
              updateNote={updateNote}
              removeNote={removeNote}
              onClear={clearHandlers.notes}
              {...baseSectionProps}
            />

            <AcceptancePanel
              invoiceData={invoiceData}
              updateAcceptance={updateAcceptance}
              onClear={clearHandlers.acceptance}
              {...baseSectionProps}
            />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="m-0 space-y-6">
            <SettingsPanel
              invoiceData={invoiceData}
              updateTaxRate={updateTaxRate}
              updateDiscountAmount={updateDiscountAmount}
              toggleSection={toggleSection}
            />
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="m-0 space-y-6">
            <BrandingPanel
              invoiceData={invoiceData}
              updateBranding={updateBranding}
              handleLogoUpload={handleLogoUpload}
              fileInputRef={fileInputRef}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer with Download */}
      <footer className="border-t p-4">
        <DownloadMenu />
      </footer>
    </div>
  )
}
