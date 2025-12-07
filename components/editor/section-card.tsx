"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp, Eye, EyeOff, Trash2, AlertCircle, Pencil, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { cn } from "@/lib/utils"
import type { SectionKey } from "@/types"

interface SectionCardProps {
  id: SectionKey
  title: string
  enabled: boolean
  isEmpty: boolean
  onToggle: (enabled: boolean) => void
  onDelete?: () => void
  onTitleChange?: (title: string) => void
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function SectionCard({
  id,
  title,
  enabled,
  isEmpty,
  onToggle,
  onDelete,
  onTitleChange,
  children,
  defaultExpanded = true,
}: SectionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const handleSaveTitle = () => {
    if (onTitleChange && editedTitle.trim()) {
      onTitleChange(editedTitle.trim())
    }
    setIsEditingTitle(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveTitle()
    } else if (e.key === "Escape") {
      setEditedTitle(title)
      setIsEditingTitle(false)
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-card transition-all duration-300",
        !enabled && "opacity-60",
        isEmpty && enabled && "border-amber-300 dark:border-amber-700",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 px-4 py-3 transition-colors",
          enabled ? "bg-muted/50" : "bg-muted/20",
        )}
      >
        <div className="flex flex-1 items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center"
            aria-expanded={expanded}
            aria-controls={`section-${id}`}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {isEditingTitle && onTitleChange ? (
            <div className="flex items-center gap-1">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveTitle}
                className="h-7 w-40 text-sm font-medium"
                autoFocus
              />
              <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleSaveTitle}>
                <Check className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <button type="button" onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-left">
              <span className="font-medium text-foreground">{title}</span>
              {isEmpty && enabled && (
                <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-3 w-3" />
                  Empty
                </span>
              )}
            </button>
          )}

          {onTitleChange && !isEditingTitle && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setEditedTitle(title)
                setIsEditingTitle(true)
              }}
              aria-label="Edit section title"
            >
              <Pencil className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle visibility */}
          <div className="flex items-center gap-2">
            {enabled ? (
              <Eye className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
            <Switch checked={enabled} onCheckedChange={onToggle} aria-label={`Toggle ${title} visibility`} />
          </div>

          {/* Delete button with confirmation */}
          {onDelete && (
            <ConfirmationDialog
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  aria-label={`Delete ${title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
              title={`Delete ${title}?`}
              description={`This will remove the ${title.toLowerCase()} section and clear all its content. This action cannot be undone.`}
              confirmLabel="Delete"
              onConfirm={onDelete}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        id={`section-${id}`}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          expanded && enabled ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
