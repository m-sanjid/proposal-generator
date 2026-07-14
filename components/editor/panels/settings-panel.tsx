"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { SettingsPanelProps } from "./types"

export function SettingsPanel({
  invoiceData,
  updateTaxRate,
  updateDiscountAmount,
  toggleSection,
}: SettingsPanelProps) {
  const { taxRate, discountAmount, currency, sections } = invoiceData

  return (
    <div className="space-y-6">
      <Card className="gap-0 overflow-hidden border-white/35 bg-background/80 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <CardHeader className="border-b border-border/60 px-5 py-4">
          <CardTitle className="text-base">Tax & discount</CardTitle>
          <CardDescription>Set the numbers that affect your final total before export.</CardDescription>
        </CardHeader>
        <CardPanel className="grid gap-4 px-5 py-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="settingsTaxRate">Tax / VAT rate (%)</Label>
            <Input
              id="settingsTaxRate"
              type="number"
              min="0"
              max="100"
              value={taxRate}
              onChange={(event) => updateTaxRate(Number.parseFloat(event.target.value) || 0)}
              className="rounded-2xl text-right tabular-nums"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="settingsDiscount">Discount amount ({currency})</Label>
            <Input
              id="settingsDiscount"
              type="number"
              min="0"
              value={discountAmount}
              onChange={(event) => updateDiscountAmount(Number.parseFloat(event.target.value) || 0)}
              className="rounded-2xl text-right tabular-nums"
            />
          </div>
        </CardPanel>
      </Card>

      <Card className="gap-0 overflow-hidden border-white/35 bg-background/80 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <CardHeader className="border-b border-border/60 px-5 py-4">
          <CardTitle className="text-base">Section visibility</CardTitle>
          <CardDescription>Quickly hide or reveal major parts of the proposal without editing content.</CardDescription>
        </CardHeader>
        <CardPanel className="grid gap-3 px-5 py-5">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex min-h-12 items-center justify-between gap-3 rounded-[20px] border border-border/60 bg-muted/20 px-4 py-3 shadow-sm"
            >
              <div>
                <span className="block text-sm font-medium text-foreground">{section.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {section.enabled ? "Visible in preview" : "Hidden from preview"}
                </span>
              </div>
              <Switch
                checked={section.enabled}
                onCheckedChange={(checked) => toggleSection(section.id, checked)}
                aria-label={`Toggle ${section.label}`}
              />
            </div>
          ))}
        </CardPanel>
      </Card>
    </div>
  )
}
