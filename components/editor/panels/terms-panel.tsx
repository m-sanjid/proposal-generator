"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionCard } from "@/components/editor/section-card"
import type { TermsPanelProps } from "./types"

const TEXTAREA_CLASSES = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"

export function TermsPanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
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
    >
      <div className="space-y-4">
        {/* Term Items Header */}
        <div className="flex items-center justify-between">
          <Label>Term Items</Label>
          <Button onClick={addTerm} size="sm" variant="outline">
            <Plus className="mr-1 h-3 w-3" />
            Add Term
          </Button>
        </div>

        {/* Term Items List */}
        <div className="space-y-3">
          {terms.map((term, index) => (
            <div key={term.id} className="rounded-lg border bg-muted/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Term {index + 1}
                </span>
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

        {/* Additional Terms */}
        <div>
          <Label htmlFor="additionalTerms">Additional Terms</Label>
          <textarea
            id="additionalTerms"
            className={TEXTAREA_CLASSES}
            value={additionalTerms}
            onChange={(e) => updateTermsConditions({ additionalTerms: e.target.value })}
            placeholder="Any additional terms..."
          />
        </div>
      </div>
    </SectionCard>
  )
}
