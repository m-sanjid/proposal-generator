"use client"

import { Check, Trash2, Upload } from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { BrandingPanelProps } from "./types"

const PRESET_COLORS = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#f59e0b", "#0891b2"] as const

export function BrandingPanel({
  invoiceData,
  updateBranding,
  handleLogoUpload,
  fileInputRef,
}: BrandingPanelProps) {
  const { logo, themeColor } = invoiceData.branding

  return (
    <div className="space-y-6">
      <Card className="gap-0 overflow-hidden border-white/35 bg-background/80 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <CardHeader className="border-b border-border/60 px-5 py-4">
          <CardTitle className="text-base">Logo</CardTitle>
          <CardDescription>Upload the mark that should appear in the proposal header and exports.</CardDescription>
        </CardHeader>
        <CardPanel className="px-5 py-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group flex min-h-[176px] w-full overflow-hidden rounded-[24px] border border-dashed border-border/70 bg-muted/15 p-4 text-left transition-[border-color,background-color,transform] duration-200 hover:border-foreground/20 hover:bg-muted/25 active:scale-[0.99]"
            >
              {logo ? (
                <div className="relative flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-24 w-full max-w-[220px] items-center justify-center rounded-[20px] border border-border/60 bg-background/90 px-4 py-3 shadow-sm">
                      <img
                        src={logo}
                        alt="Logo preview"
                        className="max-h-14 max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">Logo uploaded</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Click anywhere here to replace it in the proposal header and exports.
                      </p>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-background/80 text-muted-foreground shadow-sm">
                      <Upload className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">Upload logo</span>
                      <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                        Add a PNG, JPG, or SVG for the document header, preview, and exports.
                      </span>
                    </div>
                  </div>
                  <div className="rounded-[18px] border border-border/60 bg-background/85 px-3.5 py-3 text-sm text-muted-foreground shadow-sm">
                    Recommended: wide mark, transparent background
                  </div>
                </div>
              )}
            </button>

            <div className="rounded-[24px] border border-border/60 bg-muted/15 p-4 shadow-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Preview</p>
              <div className="mt-4 rounded-[20px] border border-border/60 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:bg-zinc-950">
                <div className="flex items-center gap-3">
                  {logo ? (
                    <div className="flex h-10 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-2 dark:border-white/10 dark:bg-zinc-900">
                      <img src={logo} alt="Brand preview" className="max-h-6 max-w-full object-contain" />
                    </div>
                  ) : (
                    <span className="h-10 w-10 rounded-2xl" style={{ backgroundColor: themeColor }} />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{invoiceData.sender.name || "Your Company"}</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">Proposal accent and identity</p>
                  </div>
                </div>
                <div className="mt-5 h-2 rounded-full bg-slate-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full" style={{ width: "42%", backgroundColor: themeColor }} />
                </div>
              </div>
            </div>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />

          {logo && (
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button variant="outline" className="rounded-2xl" onClick={() => fileInputRef.current?.click()}>
                Change logo
              </Button>
              <Button variant="destructive" className="rounded-2xl" onClick={() => updateBranding({ logo: null })}>
                <Trash2 className="h-4 w-4" />
                Remove logo
              </Button>
            </div>
          )}
        </CardPanel>
      </Card>

      <Card className="gap-0 overflow-hidden border-white/35 bg-background/80 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <CardHeader className="border-b border-border/60 px-5 py-4">
          <CardTitle className="text-base">Theme color</CardTitle>
          <CardDescription>Use the accent across headings, totals, and supporting document details.</CardDescription>
        </CardHeader>
        <CardPanel className="grid gap-4 px-5 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              type="color"
              value={themeColor}
              onChange={(event) => updateBranding({ themeColor: event.target.value })}
              className="h-12 w-20 cursor-pointer rounded-2xl border border-border/70 bg-transparent"
              aria-label="Select theme color"
            />
            <Input
              value={themeColor}
              onChange={(event) => updateBranding({ themeColor: event.target.value })}
              className="h-12 rounded-2xl font-mono uppercase tracking-[0.12em]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map((color) => {
              const selected = color === themeColor

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => updateBranding({ themeColor: color })}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.96]",
                    selected && "scale-105"
                  )}
                  aria-label={`Select color ${color}`}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full border-2",
                      selected ? "border-foreground/80" : "border-transparent"
                    )}
                  />
                  <span className="h-7 w-7 rounded-full shadow-sm" style={{ backgroundColor: color }} />
                  {selected && <Check className="absolute h-3.5 w-3.5 text-white drop-shadow-sm" />}
                </button>
              )
            })}
          </div>
        </CardPanel>
      </Card>
    </div>
  )
}
