"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionCard } from "@/components/editor/section-card"
import { ConfirmationDialog } from "@/components/editor/confirmation-dialog"
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
        {/* Date & Duration */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => updateTimeline({ startDate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={estimatedDuration}
              onChange={(e) => updateTimeline({ estimatedDuration: e.target.value })}
              placeholder="e.g., 4 Weeks"
            />
          </div>
        </div>

        {/* Milestones */}
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
              className="flex items-center gap-2 rounded border bg-muted/30 p-2"
            >
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
