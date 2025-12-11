"use client"

import { Input } from "@/components/ui/input"
import { SectionCard } from "@/components/editor/section-card"
import type { ExecutiveSummaryPanelProps } from "./types"

const TEXTAREA_CLASSES = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"

export function ExecutiveSummaryPanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  updateExecutiveSummary,
  onClear,
}: ExecutiveSummaryPanelProps) {
  return (
    <SectionCard
      id="executiveSummary"
      title={getSectionLabel("executiveSummary")}
      enabled={isSectionEnabled("executiveSummary")}
      isEmpty={isSectionEmpty("executiveSummary")}
      onToggle={(enabled) => toggleSection("executiveSummary", enabled)}
      onDelete={onClear}
      onTitleChange={(label) => updateSectionLabel("executiveSummary", label)}
    >
      <div className="grid gap-3">
        {/* Objective */}
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
            className={TEXTAREA_CLASSES}
            value={invoiceData.executiveSummary.objective}
            onChange={(e) => updateExecutiveSummary({ objective: e.target.value })}
            placeholder="Describe the client's problem or need..."
          />
        </div>

        {/* Solution */}
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
            className={TEXTAREA_CLASSES}
            value={invoiceData.executiveSummary.solution}
            onChange={(e) => updateExecutiveSummary({ solution: e.target.value })}
            placeholder="High-level overview of your solution..."
          />
        </div>
      </div>
    </SectionCard>
  )
}
