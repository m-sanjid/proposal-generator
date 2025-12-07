"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useInvoice } from "@/context/InvoiceContext"
import { Plus, Trash2, Upload, FileDown, LayoutGrid, Settings2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { SectionCard } from "@/components/editor/section-card"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

export function EditorSidebar() {
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

  const [activeTab, setActiveTab] = useState("details")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateBranding({ logo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const clearExecutiveSummary = () => {
    updateExecutiveSummary({ objective: "", solution: "" })
    toggleSection("executiveSummary", false)
  }

  const clearScopeOfWork = () => {
    updateScopeOfWork({ phases: [], exclusions: [] })
    toggleSection("scopeOfWork", false)
  }

  const clearTimeline = () => {
    updateTimeline({ startDate: "", estimatedDuration: "", milestones: [] })
    toggleSection("timeline", false)
  }

  const clearTermsConditions = () => {
    updateTermsConditions({ terms: [], additionalTerms: "" })
    toggleSection("termsConditions", false)
  }

  const clearNotes = () => {
    invoiceData.notes.forEach((note) => removeNote(note.id))
    toggleSection("notes", false)
  }

  const clearAcceptance = () => {
    updateAcceptance({ clientName: "", signatureDate: "", showSignatureLine: false })
    toggleSection("acceptance", false)
  }

  return (
    <div className="flex h-full flex-col bg-card no-print">
      {/* Header */}
      <div className="border-b p-4">
        <h1 className="text-xl font-bold text-foreground">Proposal Generator</h1>
        <p className="text-sm text-muted-foreground">Create professional proposals</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-4">
          <TabsTrigger value="details" className="text-xs">
            Details
          </TabsTrigger>
          <TabsTrigger value="sections" className="text-xs">
            <LayoutGrid className="mr-1 h-3 w-3" />
            Sections
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">
            <Settings2 className="mr-1 h-3 w-3" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="branding" className="text-xs">
            Brand
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Details Tab - Basic info */}
          <TabsContent value="details" className="m-0 space-y-6">
            {/* Document Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Document Info</h3>
              <div className="grid gap-3">
                <div>
                  <Label htmlFor="docTitle">Document Title</Label>
                  <Input
                    id="docTitle"
                    value={invoiceData.documentTitle}
                    onChange={(e) => updateDocumentInfo({ documentTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="docNumber">Document Number</Label>
                  <Input
                    id="docNumber"
                    value={invoiceData.documentNumber}
                    onChange={(e) => updateDocumentInfo({ documentNumber: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={invoiceData.issueDate}
                      onChange={(e) => updateDocumentInfo({ issueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Valid Until</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => updateDocumentInfo({ dueDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sender Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">From (Provider)</h3>
              <div className="grid gap-3">
                <div>
                  <Label htmlFor="senderName">Company Name</Label>
                  <Input
                    id="senderName"
                    value={invoiceData.sender.name}
                    onChange={(e) => updateSender({ name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="senderTaxId">Tax ID / VAT Number</Label>
                  <Input
                    id="senderTaxId"
                    value={invoiceData.sender.taxId}
                    onChange={(e) => updateSender({ taxId: e.target.value })}
                    placeholder="e.g., US12-3456789"
                  />
                </div>
                <div>
                  <Label htmlFor="senderEmail">Email</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={invoiceData.sender.email}
                    onChange={(e) => updateSender({ email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="senderPhone">Phone</Label>
                  <Input
                    id="senderPhone"
                    value={invoiceData.sender.phone}
                    onChange={(e) => updateSender({ phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="senderAddress">Address</Label>
                  <textarea
                    id="senderAddress"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={invoiceData.sender.address}
                    onChange={(e) => updateSender({ address: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="senderWebsite">Website</Label>
                  <Input
                    id="senderWebsite"
                    value={invoiceData.sender.website}
                    onChange={(e) => updateSender({ website: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Recipient Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">To (Client)</h3>
              <div className="grid gap-3">
                <div>
                  <Label htmlFor="recipientName">Contact Person</Label>
                  <Input
                    id="recipientName"
                    value={invoiceData.recipient.name}
                    onChange={(e) => updateRecipient({ name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="recipientCompany">Company Name</Label>
                  <Input
                    id="recipientCompany"
                    value={invoiceData.recipient.company}
                    onChange={(e) => updateRecipient({ company: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="recipientEmail">Email</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    value={invoiceData.recipient.email}
                    onChange={(e) => updateRecipient({ email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="recipientPhone">Phone</Label>
                  <Input
                    id="recipientPhone"
                    value={invoiceData.recipient.phone}
                    onChange={(e) => updateRecipient({ phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="recipientAddress">Billing Address</Label>
                  <textarea
                    id="recipientAddress"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={invoiceData.recipient.address}
                    onChange={(e) => updateRecipient({ address: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="m-0 space-y-4">
            <p className="text-sm text-muted-foreground">
              Toggle sections on/off, edit titles, and manage content. Click the pencil icon to rename any section.
            </p>

            {/* Executive Summary */}
            <SectionCard
              id="executiveSummary"
              title={getSectionLabel("executiveSummary")}
              enabled={isSectionEnabled("executiveSummary")}
              isEmpty={isSectionEmpty("executiveSummary")}
              onToggle={(enabled) => toggleSection("executiveSummary", enabled)}
              onDelete={clearExecutiveSummary}
              onTitleChange={(label) => updateSectionLabel("executiveSummary", label)}
            >
              <div className="grid gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Input
                      value={invoiceData.executiveSummary.objectiveLabel}
                      onChange={(e) => updateExecutiveSummary({ objectiveLabel: e.target.value })}
                      className="h-7 w-32 text-xs font-medium"
                      placeholder="Label"
                    />
                  </div>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={invoiceData.executiveSummary.objective}
                    onChange={(e) => updateExecutiveSummary({ objective: e.target.value })}
                    placeholder="Describe the client's problem or need..."
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Input
                      value={invoiceData.executiveSummary.solutionLabel}
                      onChange={(e) => updateExecutiveSummary({ solutionLabel: e.target.value })}
                      className="h-7 w-40 text-xs font-medium"
                      placeholder="Label"
                    />
                  </div>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={invoiceData.executiveSummary.solution}
                    onChange={(e) => updateExecutiveSummary({ solution: e.target.value })}
                    placeholder="High-level overview of your solution..."
                  />
                </div>
              </div>
            </SectionCard>

            {/* Scope of Work */}
            <SectionCard
              id="scopeOfWork"
              title={getSectionLabel("scopeOfWork")}
              enabled={isSectionEnabled("scopeOfWork")}
              isEmpty={isSectionEmpty("scopeOfWork")}
              onToggle={(enabled) => toggleSection("scopeOfWork", enabled)}
              onDelete={clearScopeOfWork}
              onTitleChange={(label) => updateSectionLabel("scopeOfWork", label)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Phases / Deliverables</Label>
                  <Button onClick={addPhase} size="sm" variant="outline">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Phase
                  </Button>
                </div>

                <div className="space-y-3">
                  {invoiceData.scopeOfWork.phases.map((phase, index) => (
                    <div key={phase.id} className="rounded-lg border bg-muted/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">Phase {index + 1}</span>
                        <ConfirmationDialog
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          }
                          title="Delete Phase?"
                          description={`This will remove "${phase.title}" from your proposal.`}
                          confirmLabel="Delete"
                          onConfirm={() => removePhase(phase.id)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Input
                          value={phase.title}
                          onChange={(e) => updatePhase(phase.id, { title: e.target.value })}
                          placeholder="Phase title"
                          className="text-sm"
                        />
                        <textarea
                          className="flex min-h-[50px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={phase.description}
                          onChange={(e) => updatePhase(phase.id, { description: e.target.value })}
                          placeholder="Description..."
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Exclusions</Label>
                    <Button onClick={addExclusion} size="sm" variant="outline">
                      <Plus className="mr-1 h-3 w-3" />
                      Add Exclusion
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {invoiceData.scopeOfWork.exclusions.map((exclusion, index) => (
                      <div key={exclusion.id} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{index + 1}.</span>
                        <Input
                          value={exclusion.text}
                          onChange={(e) => updateExclusion(exclusion.id, e.target.value)}
                          className="flex-1 text-sm"
                          placeholder="What is NOT included..."
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => removeExclusion(exclusion.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Timeline */}
            <SectionCard
              id="timeline"
              title={getSectionLabel("timeline")}
              enabled={isSectionEnabled("timeline")}
              isEmpty={isSectionEmpty("timeline")}
              onToggle={(enabled) => toggleSection("timeline", enabled)}
              onDelete={clearTimeline}
              onTitleChange={(label) => updateSectionLabel("timeline", label)}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={invoiceData.timeline.startDate}
                      onChange={(e) => updateTimeline({ startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={invoiceData.timeline.estimatedDuration}
                      onChange={(e) => updateTimeline({ estimatedDuration: e.target.value })}
                      placeholder="e.g., 4 Weeks"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Milestones</Label>
                  <Button onClick={addMilestone} size="sm" variant="outline">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Milestone
                  </Button>
                </div>

                <div className="space-y-2">
                  {invoiceData.timeline.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center gap-2 rounded border bg-muted/30 p-2">
                      <span className="text-xs text-muted-foreground">{index + 1}.</span>
                      <Input
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, { title: e.target.value })}
                        className="flex-1 text-sm"
                        placeholder="Milestone title"
                      />
                      <Input
                        type="date"
                        value={milestone.date}
                        onChange={(e) => updateMilestone(milestone.id, { date: e.target.value })}
                        className="w-32"
                      />
                      <ConfirmationDialog
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        }
                        title="Delete Milestone?"
                        description={`This will remove "${milestone.title}" from your timeline.`}
                        confirmLabel="Delete"
                        onConfirm={() => removeMilestone(milestone.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Financial Breakdown */}
            <SectionCard
              id="financialBreakdown"
              title={getSectionLabel("financialBreakdown")}
              enabled={isSectionEnabled("financialBreakdown")}
              isEmpty={isSectionEmpty("financialBreakdown")}
              onToggle={(enabled) => toggleSection("financialBreakdown", enabled)}
              onTitleChange={(label) => updateSectionLabel("financialBreakdown", label)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Line Items</Label>
                  <Button onClick={addItem} size="sm" variant="outline">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {invoiceData.items.map((item, index) => (
                    <div key={item.id} className="rounded-lg border bg-muted/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">Item {index + 1}</span>
                        <ConfirmationDialog
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          }
                          title="Delete Item?"
                          description={`This will remove "${item.description}" from your proposal.`}
                          confirmLabel="Delete"
                          onConfirm={() => removeItem(item.id)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, { description: e.target.value })}
                          placeholder="Description"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Qty/Hours</Label>
                            <Input
                              type="number"
                              min="0"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(item.id, { quantity: Number.parseFloat(e.target.value) || 0 })
                              }
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Unit Price ($)</Label>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.rate}
                              onChange={(e) => updateItem(item.id, { rate: Number.parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          Total:{" "}
                          <span className="font-medium text-foreground">
                            ${(item.quantity * item.rate).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      min="0"
                      max="100"
                      value={invoiceData.taxRate}
                      onChange={(e) => updateTaxRate(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount ($)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      value={invoiceData.discountAmount}
                      onChange={(e) => updateDiscountAmount(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Terms & Conditions */}
            <SectionCard
              id="termsConditions"
              title={getSectionLabel("termsConditions")}
              enabled={isSectionEnabled("termsConditions")}
              isEmpty={isSectionEmpty("termsConditions")}
              onToggle={(enabled) => toggleSection("termsConditions", enabled)}
              onDelete={clearTermsConditions}
              onTitleChange={(label) => updateSectionLabel("termsConditions", label)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Term Items</Label>
                  <Button onClick={addTerm} size="sm" variant="outline">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Term
                  </Button>
                </div>

                <div className="space-y-3">
                  {invoiceData.termsConditions.terms.map((term, index) => (
                    <div key={term.id} className="rounded-lg border bg-muted/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">Term {index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          onClick={() => removeTerm(term.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="grid gap-2">
                        <Input
                          value={term.label}
                          onChange={(e) => updateTerm(term.id, { label: e.target.value })}
                          placeholder="Label (e.g., Payment)"
                          className="text-sm font-medium"
                        />
                        <Input
                          value={term.value}
                          onChange={(e) => updateTerm(term.id, { value: e.target.value })}
                          placeholder="Value (e.g., 50% Upfront)"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <Label htmlFor="additionalTerms">Additional Terms</Label>
                  <textarea
                    id="additionalTerms"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={invoiceData.termsConditions.additionalTerms}
                    onChange={(e) => updateTermsConditions({ additionalTerms: e.target.value })}
                    placeholder="Any additional terms..."
                  />
                </div>
              </div>
            </SectionCard>

            {/* Notes */}
            <SectionCard
              id="notes"
              title={getSectionLabel("notes")}
              enabled={isSectionEnabled("notes")}
              isEmpty={isSectionEmpty("notes")}
              onToggle={(enabled) => toggleSection("notes", enabled)}
              onDelete={clearNotes}
              onTitleChange={(label) => updateSectionLabel("notes", label)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Notes</Label>
                  <Button onClick={addNote} size="sm" variant="outline">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Note
                  </Button>
                </div>

                <div className="space-y-2">
                  {invoiceData.notes.map((note, index) => (
                    <div key={note.id} className="flex items-start gap-2">
                      <span className="mt-2 text-xs text-muted-foreground">{index + 1}.</span>
                      <textarea
                        className="flex min-h-[60px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={note.text}
                        onChange={(e) => updateNote(note.id, e.target.value)}
                        placeholder="Add a note..."
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => removeNote(note.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Acceptance */}
            <SectionCard
              id="acceptance"
              title={getSectionLabel("acceptance")}
              enabled={isSectionEnabled("acceptance")}
              isEmpty={isSectionEmpty("acceptance")}
              onToggle={(enabled) => toggleSection("acceptance", enabled)}
              onDelete={clearAcceptance}
              onTitleChange={(label) => updateSectionLabel("acceptance", label)}
            >
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showSignature">Show Signature Line</Label>
                  <Switch
                    id="showSignature"
                    checked={invoiceData.acceptance.showSignatureLine}
                    onCheckedChange={(checked) => updateAcceptance({ showSignatureLine: checked })}
                  />
                </div>
                <div>
                  <Label htmlFor="clientSignatureName">Client Name (pre-fill)</Label>
                  <Input
                    id="clientSignatureName"
                    value={invoiceData.acceptance.clientName}
                    onChange={(e) => updateAcceptance({ clientName: e.target.value })}
                    placeholder="Leave blank for client to fill"
                  />
                </div>
                <div>
                  <Label htmlFor="signatureDate">Date</Label>
                  <Input
                    id="signatureDate"
                    type="date"
                    value={invoiceData.acceptance.signatureDate}
                    onChange={(e) => updateAcceptance({ signatureDate: e.target.value })}
                  />
                </div>
              </div>
            </SectionCard>
          </TabsContent>

          {/* Settings Tab - Tax, Discount, etc. */}
          <TabsContent value="settings" className="m-0 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Tax & Discounts</h3>
              <div className="grid gap-3">
                <div>
                  <Label htmlFor="settingsTaxRate">Tax/VAT Rate (%)</Label>
                  <Input
                    id="settingsTaxRate"
                    type="number"
                    min="0"
                    max="100"
                    value={invoiceData.taxRate}
                    onChange={(e) => updateTaxRate(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="settingsDiscount">Discount Amount ($)</Label>
                  <Input
                    id="settingsDiscount"
                    type="number"
                    min="0"
                    value={invoiceData.discountAmount}
                    onChange={(e) => updateDiscountAmount(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Section Visibility</h3>
              <p className="text-sm text-muted-foreground">Quick toggles for all proposal sections</p>
              <div className="space-y-2">
                {invoiceData.sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">{section.label}</span>
                    <Switch
                      checked={section.enabled}
                      onCheckedChange={(checked) => toggleSection(section.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="m-0 space-y-6">
            {/* Logo Upload */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Logo</h3>
              <div className="flex flex-col items-center gap-4">
                {invoiceData.branding.logo ? (
                  <div className="relative">
                    <img
                      src={invoiceData.branding.logo || "/placeholder.svg"}
                      alt="Logo preview"
                      className="h-20 max-w-full object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                      onClick={() => updateBranding({ logo: null })}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-muted-foreground/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload logo</span>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                {invoiceData.branding.logo && (
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    Change Logo
                  </Button>
                )}
              </div>
            </div>

            {/* Theme Color */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Theme Color</h3>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={invoiceData.branding.themeColor}
                  onChange={(e) => updateBranding({ themeColor: e.target.value })}
                  className="h-10 w-16 cursor-pointer rounded border"
                />
                <Input
                  value={invoiceData.branding.themeColor}
                  onChange={(e) => updateBranding({ themeColor: e.target.value })}
                  className="flex-1"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#f59e0b", "#0891b2"].map((color) => (
                  <button
                    key={color}
                    className="h-8 w-8 rounded-full border-2 border-transparent transition-all hover:scale-110 focus:border-foreground"
                    style={{ backgroundColor: color }}
                    onClick={() => updateBranding({ themeColor: color })}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Download Button */}
      <div className="border-t p-4">
        <Button onClick={handlePrint} className="w-full" size="lg">
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
