"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ProposalDateFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  compact?: boolean
  disabled?: boolean
}

function parseDateString(dateStr: string): Date | undefined {
  if (!dateStr) return undefined
  const [year, month, day] = dateStr.split("-").map(Number)
  if (!year || !month || !day) return undefined
  return new Date(year, month - 1, day)
}

function toDateString(date: Date | undefined): string {
  if (!date) return ""
  return format(date, "yyyy-MM-dd")
}

export function ProposalDateField({
  value,
  onChange,
  placeholder = "Select date...",
  className,
  compact = false,
  disabled,
}: ProposalDateFieldProps) {
  const [open, setOpen] = useState(false)
  const date = parseDateString(value)
  const displayFormat = compact ? "MMM d, yyyy" : "PPP"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              compact && "h-8 text-sm",
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-60" />
            {date ? format(date, displayFormat) : <span>{placeholder}</span>}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(selected) => {
            onChange(toDateString(selected))
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
