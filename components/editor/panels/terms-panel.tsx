"use client"

import { Plus, X } from "lucide-react"

import { SectionCard } from "@/components/editor/section-card"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { TermsPanelProps } from "./types"

export function TermsPanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  expandedSection,
  onExpandedSectionChange,
  addTerm,
  updateTerm,
  removeTerm,
  updateTermsConditions,
  onClear,
}: TermsPanelProps) {
  const { terms, additionalTerms } = invoiceData.termsConditions

  return (
    <SectionCard
      id="termsConditions"
      title={getSectionLabel("termsConditions")}
      enabled={isSectionEnabled("termsConditions")}
      isEmpty={isSectionEmpty("termsConditions")}
      onToggle={(enabled) => toggleSection("termsConditions", enabled)}
      onDelete={onClear}
      onTitleChange={(label) => updateSectionLabel("termsConditions", label)}
      expanded={expandedSection === "termsConditions"}
      onExpandedChange={(expanded) => onExpandedSectionChange(expanded ? "termsConditions" : null)}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Label className="text-sm font-semibold text-foreground">Term items</Label>
            <p className="mt-1 text-sm text-muted-foreground">Use short labels and specific values that read well in the proposal summary.</p>
          </div>
          <Button onClick={addTerm} size="sm" variant="outline" className="h-9 rounded-2xl px-4">
            <Plus className="h-4 w-4" />
            Add term
          </Button>
        </div>

        <div className="space-y-3">
          {terms.map((term, index) => (
            <div key={term.id} className="rounded-[18px] border border-border/60 bg-muted/12 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-muted-foreground">Term {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-2xl text-destructive hover:text-destructive"
                  onClick={() => removeTerm(term.id)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-[minmax(180px,0.7fr)_minmax(0,1fr)]">
                <Input
                  value={term.label}
                  onChange={(event) => updateTerm(term.id, { label: event.target.value })}
                  placeholder="Label (e.g., Payment)"
                  className="rounded-2xl text-sm font-medium"
                />
                <Input
                  value={term.value}
                  onChange={(event) => updateTerm(term.id, { value: event.target.value })}
                  placeholder="Value (e.g., 50% upfront)"
                  className="rounded-2xl text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="additionalTerms">Additional terms</Label>
          <RichTextEditor
            value={additionalTerms}
            onChange={(value) => updateTermsConditions({ additionalTerms: value })}
            placeholder="Any additional terms..."
          />
        </div>
      </div>
    </SectionCard>
  )
}
