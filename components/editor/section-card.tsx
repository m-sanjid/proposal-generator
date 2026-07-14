"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AlertCircle, Check, ChevronDown, Eye, EyeOff, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import type { SectionKey } from "@/types"

import { ConfirmationDialog } from "./confirmation-dialog"

interface SectionCardProps {
  id: SectionKey
  title: string
  enabled: boolean
  isEmpty: boolean
  onToggle: (enabled: boolean) => void
  onDelete?: () => void
  onTitleChange?: (title: string) => void
  children: React.ReactNode
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
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
  expanded: expandedProp,
  onExpandedChange,
  defaultExpanded = false,
}: SectionCardProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const expanded = expandedProp ?? uncontrolledExpanded

  const setExpanded = (nextExpanded: boolean | ((current: boolean) => boolean)) => {
    const resolvedExpanded = typeof nextExpanded === "function" ? nextExpanded(expanded) : nextExpanded

    if (expandedProp === undefined) {
      setUncontrolledExpanded(resolvedExpanded)
    }

    onExpandedChange?.(resolvedExpanded)
  }

  useEffect(() => {
    setEditedTitle(title)
  }, [title])

  const handleSaveTitle = () => {
    if (onTitleChange && editedTitle.trim()) {
      onTitleChange(editedTitle.trim())
    }
    setIsEditingTitle(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSaveTitle()
    } else if (event.key === "Escape") {
      setEditedTitle(title)
      setIsEditingTitle(false)
    }
  }

  return (
    <section
      className={cn(
        "overflow-hidden rounded-[20px] border border-border/60 bg-background/86 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_20px_rgba(15,23,42,0.04)] transition-[opacity,border-color,box-shadow] duration-200",
        !enabled && "opacity-70",
        enabled && isEmpty && "border-amber-300/80 dark:border-amber-700/70"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3 border-b border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
          expanded && enabled ? "bg-background/78" : "bg-muted/16"
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-muted-foreground transition-[background-color,color,transform] duration-200 hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.96]"
            aria-expanded={expanded}
            aria-controls={`section-${id}`}
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")} />
          </button>

          <div className="min-w-0 flex-1">
            {isEditingTitle && onTitleChange ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editedTitle}
                  onChange={(event) => setEditedTitle(event.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSaveTitle}
                  className="h-9 max-w-xs rounded-2xl bg-background/92 text-sm font-medium"
                  autoFocus
                />
                <Button type="button" variant="outline" size="icon-sm" className="rounded-2xl" onClick={handleSaveTitle}>
                  <Check className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  className="min-w-0 text-left focus-visible:outline-none"
                >
                  <span className="block truncate text-[15px] font-semibold text-foreground">{title}</span>
                </button>
                {isEmpty && enabled && (
                  <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:border-amber-700/70 dark:bg-amber-950/30 dark:text-amber-300">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Empty
                  </span>
                )}
              </div>
            )}
          </div>

          {onTitleChange && !isEditingTitle && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-2xl text-muted-foreground hover:text-foreground"
              onClick={() => {
                setEditedTitle(title)
                setIsEditingTitle(true)
              }}
              aria-label="Edit section title"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <div className="flex min-h-9 items-center gap-2 rounded-full border border-border/60 bg-background/88 px-2.5 py-1.5">
            {enabled ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            <span className="text-xs font-medium text-muted-foreground">{enabled ? "Shown" : "Hidden"}</span>
            <Switch checked={enabled} onCheckedChange={onToggle} aria-label={`Toggle ${title} visibility`} />
          </div>

          {onDelete && (
            <ConfirmationDialog
              title={`Delete ${title}?`}
              description={`This will remove the ${title.toLowerCase()} section and clear all its content. This action cannot be undone.`}
              confirmLabel="Delete"
              onConfirm={onDelete}
            />
          )}
        </div>
      </div>

      <div
        id={`section-${id}`}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          expanded && enabled ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-4 sm:px-4 sm:py-4.5">{children}</div>
        </div>
      </div>
    </section>
  )
}
