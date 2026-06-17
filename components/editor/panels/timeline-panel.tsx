"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionCard } from "@/components/editor/section-card"
import { ConfirmationDialog } from "@/components/editor/confirmation-dialog"
import { ProposalDateField } from "@/components/reui/proposal-date-field"
import type { TimelinePanelProps } from "./types"

export function TimelinePanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
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
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
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
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="flex flex-col gap-3 rounded-xl border bg-muted/20 p-3 sm:flex-row sm:items-start"
            >
              <span className="text-xs font-medium text-muted-foreground sm:mt-2">
                {index + 1}.
              </span>
              <Input
                value={milestone.title}
                onChange={(e) => updateMilestone(milestone.id, { title: e.target.value })}
                className="flex-1 text-sm"
                placeholder="Milestone title"
              />
              <div className="w-full sm:w-44">
                <ProposalDateField
                  value={milestone.date}
                  onChange={(date) => updateMilestone(milestone.id, { date })}
                  placeholder="Date"
                  compact
                />
              </div>
              <ConfirmationDialog
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
  )
}
