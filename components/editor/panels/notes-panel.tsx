"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SectionCard } from "@/components/editor/section-card"
import type { NotesPanelProps } from "./types"

const TEXTAREA_CLASSES = "flex min-h-[60px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"

export function NotesPanel({
  invoiceData,
  getSectionLabel,
  isSectionEnabled,
  isSectionEmpty,
  toggleSection,
  updateSectionLabel,
  addNote,
  updateNote,
  removeNote,
  onClear,
}: NotesPanelProps) {
  const { notes } = invoiceData

  return (
    <SectionCard
      id="notes"
      title={getSectionLabel("notes")}
      enabled={isSectionEnabled("notes")}
      isEmpty={isSectionEmpty("notes")}
      onToggle={(enabled) => toggleSection("notes", enabled)}
      onDelete={onClear}
      onTitleChange={(label) => updateSectionLabel("notes", label)}
    >
      <div className="space-y-3">
        {/* Notes Header */}
        <div className="flex items-center justify-between">
          <Label>Notes</Label>
          <Button onClick={addNote} size="sm" variant="outline">
            <Plus className="mr-1 h-3 w-3" />
            Add Note
          </Button>
        </div>

        {/* Notes List */}
        <div className="space-y-2">
          {notes.map((note, index) => (
            <div key={note.id} className="flex items-start gap-2">
              <span className="mt-2 text-xs text-muted-foreground">{index + 1}.</span>
              <textarea
                className={TEXTAREA_CLASSES}
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
  )
}
