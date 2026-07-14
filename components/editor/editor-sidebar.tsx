"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"

import { DownloadMenu } from "@/components/editor/download-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInvoice } from "@/context/invoice-context"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import type { SectionKey } from "@/types"

import {
  AcceptancePanel,
  BrandingPanel,
  DetailsPanel,
  ExecutiveSummaryPanel,
  FinancialBreakdownPanel,
  NotesPanel,
  ScopeOfWorkPanel,
  SettingsPanel,
  TermsPanel,
  TimelinePanel,
} from "./panels"

const TABS = [
  { value: "details", label: "Details", hint: "Parties & dates" },
  { value: "sections", label: "Sections", hint: "Content blocks" },
  { value: "settings", label: "Settings", hint: "Visibility & math" },
  { value: "branding", label: "Brand", hint: "Logo & color" },
] as const

type TabValue = (typeof TABS)[number]["value"]

export function EditorSidebar({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TabValue>("details")
  const [expandedSection, setExpandedSection] = useState<SectionKey | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    invoiceData,
    calculations,
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

  const handleLogoUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onloadend = () => {
        updateBranding({ logo: reader.result as string })
      }
      reader.readAsDataURL(file)
    },
    [updateBranding]
  )

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

  const baseSectionProps = {
    getSectionLabel,
    isSectionEnabled,
    isSectionEmpty,
    toggleSection,
    updateSectionLabel,
    expandedSection,
    onExpandedSectionChange: setExpandedSection,
  }

  const tabMeta = useMemo(
    () =>
      ({
        details: {
          title: "Proposal details",
          description: "Document identity, sender, client, and the fields needed before writing the body.",
        },
        sections: {
          title: "Document sections",
          description: "Manage the actual proposal content, pricing, milestones, and signature areas.",
        },
        settings: {
          title: "Calculation settings",
          description: "Fine-tune tax, discount, and visibility without changing content structure.",
        },
        branding: {
          title: "Brand styling",
          description: "Set logo and accent so the exported proposal looks finished, not generic.",
        },
      }) satisfies Record<TabValue, { title: string; description: string }>,
    []
  )

  const totalLabel = formatCurrency(calculations.grandTotal, invoiceData.currency)

  return (
    <div className={cn("editor-panel flex h-full w-full flex-col overflow-hidden rounded-[24px]", className)}>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="flex h-full flex-col gap-0">
        <div className="border-b border-white/35 px-3.5 pb-3.5 pt-3.5 sm:px-4 sm:pb-4">
          <div className="grid gap-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold tracking-[-0.02em] text-foreground">Editor</h2>
                <p className="mt-1 text-sm text-muted-foreground">Compact controls for shaping the document.</p>
              </div>
              <div className="rounded-2xl border border-white/35 bg-background/70 px-3 py-2 shadow-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Total</div>
                <div className="mt-0.5 text-sm font-semibold text-foreground tabular-nums">{totalLabel}</div>
              </div>
            </div>

            <TabsList className="grid h-auto w-full grid-cols-2 gap-1.5 rounded-[16px] bg-muted/60 p-1.5 shadow-inner sm:grid-cols-4">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="min-h-9 rounded-2xl px-2.5 py-2 text-left data-[state=active]:shadow-sm"
                  title={tab.hint}
                >
                  <span className="text-[13px] font-semibold leading-none">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3.5 py-3.5 sm:px-4 sm:py-4">
          <div className="mb-4 rounded-[18px] border border-white/35 bg-background/70 p-3.5 shadow-sm">
            <p className="text-sm font-medium text-foreground">{tabMeta[activeTab].title}</p>
            <p className="mt-1.5 text-pretty text-sm leading-6 text-muted-foreground">{tabMeta[activeTab].description}</p>
          </div>

          <TabsContent value="details" className="m-0 space-y-4">
            <DetailsPanel
              invoiceData={invoiceData}
              updateDocumentInfo={updateDocumentInfo}
              updateSender={updateSender}
              updateRecipient={updateRecipient}
            />
          </TabsContent>

          <TabsContent value="sections" className="m-0 space-y-3.5">
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

          <TabsContent value="settings" className="m-0 space-y-4">
            <SettingsPanel
              invoiceData={invoiceData}
              updateTaxRate={updateTaxRate}
              updateDiscountAmount={updateDiscountAmount}
              toggleSection={toggleSection}
            />
          </TabsContent>

          <TabsContent value="branding" className="m-0 space-y-4">
            <BrandingPanel
              invoiceData={invoiceData}
              updateBranding={updateBranding}
              handleLogoUpload={handleLogoUpload}
              fileInputRef={fileInputRef}
            />
          </TabsContent>
        </div>
      </Tabs>

      <footer className="border-t border-white/35 bg-background/70 px-3.5 py-3 sm:px-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">Export</p>
            <p className="text-sm text-muted-foreground">Open the preview modal or download the current draft.</p>
          </div>
        </div>
        <DownloadMenu />
      </footer>
    </div>
  )
}
