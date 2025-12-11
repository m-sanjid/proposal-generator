"use client"

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
  const { taxRate, discountAmount, sections } = invoiceData

  return (
    <div className="space-y-4">
      {/* Tax & Discounts */}
      <h3 className="font-semibold text-foreground">Tax & Discounts</h3>
      <div className="grid gap-3">
        <div>
          <Label htmlFor="settingsTaxRate">Tax/VAT Rate (%)</Label>
          <Input
            id="settingsTaxRate"
            type="number"
            min="0"
            max="100"
            value={taxRate}
            onChange={(e) => updateTaxRate(Number.parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="settingsDiscount">Discount Amount ($)</Label>
          <Input
            id="settingsDiscount"
            type="number"
            min="0"
            value={discountAmount}
            onChange={(e) => updateDiscountAmount(Number.parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Section Visibility */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Section Visibility</h3>
        <p className="text-sm text-muted-foreground">
          Quick toggles for all proposal sections
        </p>
        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <span className="text-sm font-medium">{section.label}</span>
              <Switch
                checked={section.enabled}
                onCheckedChange={(checked) => toggleSection(section.id, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
