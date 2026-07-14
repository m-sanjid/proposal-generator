"use client"

import { Plus } from "lucide-react"

import { ConfirmationDialog } from "@/components/editor/confirmation-dialog"
import { SectionCard } from "@/components/editor/section-card"
import { ProposalDateField } from "@/components/reui/proposal-date-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { TimelinePanelProps } from "./types"

export function TimelinePanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  expandedSection,
  onExpandedSectionChange,
  updateTimeline,
  addMilestone,
  updateMilestone,
  removeMilestone,
  onClear,
}: TimelinePanelProps) {
  const { startDate, estimatedDuration, milestones } = invoiceData.timeline

  return (
    <SectionCard
      id="timeline"
      title={getSectionLabel("timeline")}
      enabled={isSectionEnabled("timeline")}
      isEmpty={isSectionEmpty("timeline")}
      onToggle={(enabled) => toggleSection("timeline", enabled)}
      onDelete={onClear}
      onTitleChange={(label) => updateSectionLabel("timeline", label)}
      expanded={expandedSection === "timeline"}
      onExpandedChange={(expanded) => onExpandedSectionChange(expanded ? "timeline" : null)}
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="startDate">Start date</Label>
            <ProposalDateField
              value={startDate}
              onChange={(value) => updateTimeline({ startDate: value })}
              placeholder="Select start date"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={estimatedDuration}
              onChange={(event) => updateTimeline({ estimatedDuration: event.target.value })}
              placeholder="e.g., 4 Weeks"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <Label className="text-sm font-semibold text-foreground">Milestones</Label>
            <p className="mt-1 text-sm text-muted-foreground">Keep the delivery sequence clear and easy to scan in the preview.</p>
          </div>
          <Button onClick={addMilestone} size="sm" variant="outline" className="h-9 rounded-2xl px-4">
            <Plus className="h-4 w-4" />
            Add milestone
          </Button>
        </div>

        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="rounded-[18px] border border-border/60 bg-muted/12 p-4 shadow-sm">
              <div className="grid gap-3 md:grid-cols-[32px_minmax(0,1fr)_180px_auto] md:items-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-foreground">
                  {index + 1}
                </div>
                <Input
                  value={milestone.title}
                  onChange={(event) => updateMilestone(milestone.id, { title: event.target.value })}
                  className="rounded-2xl text-sm"
                  placeholder="Milestone title"
                />
                <div className="w-full">
                  <ProposalDateField
                    value={milestone.date}
                    onChange={(date) => updateMilestone(milestone.id, { date })}
                    placeholder="Date"
                    compact
                  />
                </div>
                <div className="flex justify-end md:pt-0.5">
                  <ConfirmationDialog
                    title="Delete Milestone?"
                    description={`This will remove "${milestone.title}" from your timeline.`}
                    confirmLabel="Delete"
                    onConfirm={() => removeMilestone(milestone.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
