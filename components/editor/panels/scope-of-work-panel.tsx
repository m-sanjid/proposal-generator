"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionCard } from "@/components/editor/section-card"
import { ConfirmationDialog } from "@/components/editor/confirmation-dialog"
import type { ScopeOfWorkPanelProps } from "./types"

const TEXTAREA_CLASSES = "flex min-h-[50px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"

export function ScopeOfWorkPanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  addPhase,
  updatePhase,
  removePhase,
  addExclusion,
  updateExclusion,
  removeExclusion,
  onClear,
}: ScopeOfWorkPanelProps) {
  const { phases, exclusions } = invoiceData.scopeOfWork

  return (
    <SectionCard
      id="scopeOfWork"
      title={getSectionLabel("scopeOfWork")}
      enabled={isSectionEnabled("scopeOfWork")}
      isEmpty={isSectionEmpty("scopeOfWork")}
      onToggle={(enabled) => toggleSection("scopeOfWork", enabled)}
      onDelete={onClear}
      onTitleChange={(label) => updateSectionLabel("scopeOfWork", label)}
    >
      <div className="space-y-4">
        {/* Phases / Deliverables */}
        <div className="flex items-center justify-between">
          <Label>Phases / Deliverables</Label>
          <Button onClick={addPhase} size="sm" variant="outline">
            <Plus className="mr-1 h-3 w-3" />
            Add Phase
          </Button>
        </div>

        <div className="space-y-3">
          {phases.map((phase, index) => (
            <div key={phase.id} className="rounded-lg border bg-muted/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Phase {index + 1}
                </span>
                <ConfirmationDialog
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
                  className={TEXTAREA_CLASSES}
                  value={phase.description}
                  onChange={(e) => updatePhase(phase.id, { description: e.target.value })}
                  placeholder="Description..."
                />
              </div>
            </div>
          ))}
        </div>

        {/* Exclusions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Exclusions</Label>
            <Button onClick={addExclusion} size="sm" variant="outline">
              <Plus className="mr-1 h-3 w-3" />
              Add Exclusion
            </Button>
          </div>
          <div className="space-y-2">
            {exclusions.map((exclusion, index) => (
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
  )
}
